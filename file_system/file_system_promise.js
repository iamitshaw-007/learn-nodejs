import fsPromises, { constants } from "fs/promises";
import fs from "fs";
import path from "path";

const fileOperation = async function (fileName) {
    try {
        /* file read operation */
        await fsPromises
            .readFile(path.join(path.dirname(import.meta.filename), fileName), {
                encoding: "utf-8",
            })
            .then((data) => console.log(data))
            .catch((error) => {
                throw new Error("fileReadOperationException");
            });

        /* file rename operation */
        await fsPromises
            .rename(
                path.join(path.dirname(import.meta.filename), fileName),
                path.join(
                    path.dirname(import.meta.filename),
                    "contact-list.txt"
                )
            )
            .then((data) => {
                return console.log("Rename Operation  Completed");
            })
            .catch((error) => {
                throw new Error("fileRenameOperationException");
            });
        /* file copy operation */
        await fsPromises
            .copyFile(
                path.join(
                    path.dirname(import.meta.filename),
                    "contact-list.txt"
                ),
                path.join(path.dirname(import.meta.filename), fileName),
                constants.COPYFILE_EXCL
            )
            .then((data) => {
                console.log("Copy Operation Completed");
            })
            .catch((error) => {
                throw new Error("fileCopyOperationException");
            });
        /* file delete operation */
        await fsPromises
            .unlink(
                path.join(
                    path.dirname(import.meta.filename),
                    "contact-list.txt"
                )
            )
            .then((data) => {
                console.log("Delete Operation Completed");
            })
            .catch((error) => {
                throw new Error("fileDeleteOperationException");
            });

        if (
            !fs.existsSync(
                path.join(path.dirname(import.meta.filename), "dirName")
            )
        ) {
            /* if directory doesn't exists */
            await fsPromises
                .mkdir(
                    path.join(path.dirname(import.meta.filename), "dirName"),
                    {
                        recursive: true,
                    }
                )
                .then((data) => console.log("Directory Created"))
                .catch((error) => {
                    throw new Error("folderDirectoryCreatedException");
                });
        } else {
            /* if directory exists */
            await fsPromises
                .rm(path.join(path.dirname(import.meta.filename), "dirName"), {
                    recursive: true,
                })
                .then((data) => console.log("Directory Removed"))
                .catch((error) => {
                    throw new Error("folderDirectoryRemovedException");
                });
        }
    } catch (error) {
        console.error(error);
    }
};

fileOperation("contacts.txt");
