import { format } from "date-fns";
import { v4 } from "uuid";

import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

async function logEvents(message) {
    const formattedDate = format(Date.now(), "yyyy-MM-dd hh::mm::ss aaa");
    // console.log(formattedDate);

    const random_uuid = v4();
    // console.log(random_uuid);

    /* check whether logs directory exists */
    if (!fs.existsSync(path.join(path.dirname(import.meta.filename), "logs"))) {
        try {
            /* if logs directory doesn't exists then create it */
            await fsPromises
                .mkdir(path.join(path.dirname(import.meta.filename), "logs"))
                .then((data) => console.log("Directory Created"))
                .catch((error) => {
                    throw new Error("fileDirectoryCreationException");
                });
        } catch (error) {
            console.error(error);
        }
    }
    try {
        /* log the message in the logger.txt file */
        await fsPromises
            .appendFile(
                path.join(
                    path.dirname(import.meta.filename),
                    "logs",
                    "logger.txt"
                ),
                `${formattedDate} - ${random_uuid}:: ${message}\n`
            )
            .then((value) => console.log("Event Logged"))
            .catch((error) => {
                throw new Error("fileAppendOperationException");
            });
    } catch (error) {
        console.error(error);
    }
}
// logEvents("Life is everything");
export { logEvents };
