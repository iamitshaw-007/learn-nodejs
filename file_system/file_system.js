import fs from "fs";
import path from "path";
import { userInfo } from "./contacts.js";

/* file write operation */
try {
    fs.writeFile(
        path.join(path.dirname(import.meta.filename), "contacts.txt"),
        (userInfo || [])
            .map((user) => {
                return `${user.firstName} ${user.lastName}: ${user.countryCode}${user.phone} (${user.email})`;
            })
            .join("\n"),
        (error) => {
            if (error) throw Error("fileWriteOperationException");
        }
    );
} catch (error) {
    console.error(error);
}

/* file append operation */
try {
    const userInformation = {
        firstName: "Ajeet",
        lastName: "Shaw",
        phone: "9523381217",
        email: "imajeetshaw99@gmail.com",
        job: "Agriculture / Farmer",
        gender: "male",
        countryCode: "+91 - ",
    };
    fs.appendFile(
        path.join(path.dirname(import.meta.filename), "contacts.txt"),
        `\n${userInformation.firstName} ${userInformation.lastName}: ${userInformation.countryCode}${userInformation.phone} (${userInformation.email})`,
        (error) => {
            if (error) throw new Error("fileAppendOperationException");
            else {
                console.log(
                    `Data Appended: ${path.join(
                        path.dirname(import.meta.filename),
                        "conatcts.txt"
                    )}`
                );
            }
        }
    );
} catch (error) {
    console.error(error);
}

/* file read operation */
try {
    fs.readFile(
        path.join(path.dirname(import.meta.filename), "contacts.txt"),
        {
            encoding: "utf-8",
        },
        (error, data) => {
            if (error) {
                throw new Error("fileReadOperationException");
            } else {
                console.log(data);
            }
        }
    );
} catch (error) {
    console.error(error);
}

/* file delete operation */
try {
    fs.unlink(
        path.join(path.dirname(import.meta.filename), "contacts.txt"),
        (error) => {
            if (error) throw new Error("fileDeleteOperationException");
            else {
                console.log(
                    `File Deleted: ${path.join(
                        path.basename(import.meta.filename)
                    )}`
                );
            }
        }
    );
} catch (error) {
    console.error(error);
}

/* exit on uncaught exception */
process.on("uncaughtException", (error) => {
    console.error(`Uncaught Exception: ${error}`);
    process.exit(1);
});
