// @flow
const API_GATEWAY_URL = "https://lpqdexxrvj.execute-api.ap-southeast-2.amazonaws.com/prod?UUIDs=";
import { logError } from "../Utils";
import moment from "moment";
import lodash from "lodash";
import type { RootState } from "../Reducers";
import type { ReportsAction } from "../Reducers/Reports";
import { fetchedReports } from "../Reducers/Reports/reportsActions";

type Dispatch = (action: ReportsAction) => void;
type GetState = () => RootState;

export default () =>
  (dispatch: Dispatch, getState: GetState) => {
    const { kidsState } = getState();
    const UUIDs = Object.keys(kidsState);
    const UUIDString = UUIDs.join(",");
    const offset = moment().utcOffset();
    const url = `${API_GATEWAY_URL}${UUIDString}&offset=${offset}`;

    return fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error fetching report: ${JSON.stringify(res)}`);
        }
        return res.json();
      })
      .then(data => {
        const reports = lodash.zipObject(data.map(d => d.uuid), data);
        dispatch(fetchedReports(reports));
      })
      .catch(error => {
        logError(error);
        dispatch(fetchedReports(null));
      });
  };
