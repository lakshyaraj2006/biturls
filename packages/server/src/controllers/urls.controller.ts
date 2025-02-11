import { Request, Response } from "express";
import { Url } from "../models/urls.model";
import { UrlDetails } from "../types/url-details";
import { nanoid } from "nanoid";

export const getUrls = async (req: Request, res: Response) => {
    const { id } = req.query;
    const user = req.user;

    if (!id) {
        const urls = await Url.find({ user });

        res.status(200).json({ urls });
    } else {
        const url = await Url.findById(id);

        if (!url) {
            res.status(404).json({
                message: 'Url was not found!',
            })
        }

        res.status(200).json({ url });
    }
}

export const redirectToUrl = async (req: Request, res: Response) => {
    const { id } = req.query;
    const url = await Url.findOne({ shortenID: id });

    if (!url) {
        res.status(404).json({
            message: 'Url was not found!',
        })
    }

    res.status(200).json({ url: url?.url });
}

export const createUrl = async (req: Request, res: Response) => {
    const { url } = req.body as UrlDetails;
    const user = req.user;
    let success = false;

    const urlRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;

    if (!url) {
        res.status(400).json({
            success,
            message: 'Please enter a url!'
        })
    } else if (!urlRegex.test(url)) {
        res.status(400).json({
            success,
            message: 'Please enter a valid url!'
        })
    } else {
        const shortenID = nanoid(8);
        const newUrl = await Url.create({
            url: url,
            shortenID: shortenID,
            user: user
        });
        success = true;

        res.status(201).json({
            success,
            message: 'Url has been created!',
            data: newUrl
        })
    }

}

export const updateUrl = async (req: Request, res: Response) => {
    const { id } = req.query;
    const { url } = req.body as UrlDetails;
    const user = req.user;
    let success = false;

    const urlRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;

    if (!url) {
        res.status(400).json({
            success,
            message: 'Please enter a url!'
        })
    } else if (!urlRegex.test(url)) {
        res.status(400).json({
            success,
            message: 'Please enter a valid url!'
        })
    } else {
        const existing = await Url.findById(id);

        if (existing) {
            if (existing?.user.toString() === user) {
                const updatedUrl = await Url.findByIdAndUpdate(id, {
                    $set: { url: url }
                });
                success = true;

                res.status(200).json({
                    success,
                    message: 'Url has been updated!'
                })
            } else {
                res.status(401).json({
                    success,
                    message: 'You cannot modify this url!',
                })
            }
        }
        else {
            res.status(404).json({
                success,
                message: 'Url was not found!',
            })
        }

    }
}

export const deleteUrl = async (req: Request, res: Response) => {
    const { id } = req.query;
    const user = req.user;
    let success = false;

    const url = await Url.findById(id);

    if (url) {
        if (url?.user.toString() === user) {
            await Url.findByIdAndDelete(id);
            success = true;

            res.status(200).json({
                success,
                message: 'Url has been deleted!'
            })
        } else {
            res.status(401).json({
                success,
                message: 'You cannot delete this url!',
            })
        }
    }
    else {
        res.status(404).json({
            success,
            message: 'Url was not found!',
        })
    }
}
