import { sleep } from "../utils/helpers"
import JSONData from "../data/mock-data.json"

export const fetchAPI = async () => {
  const MOCK_DELAY = 300

  await sleep(MOCK_DELAY)

  console.log(JSONData)
  return JSONData
}
