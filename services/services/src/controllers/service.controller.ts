import { Request, Response } from "express";
import { addService, findServiceById, findServicesBySid } from "../repository/service.repository";
import { validateCreateServiceRequest } from "../validations";
import { Service } from "@prisma/client";

export const createService = async (req: Request, res: Response) => {
    const { error, value } = validateCreateServiceRequest(req.body);
    console.log(value);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    const { uid } = req.user!;
    const serviceBody = { ...value, uid } as Service;
    const service = await addService(serviceBody);

    res.status(201).send({ data: { service } });
}

export const getServices = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "Invalid request" });
    }

    const services = await findServicesBySid(id);
    res.status(200).send({ data: { services } });
}

export const getService = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "Invalid request" });
    }

    const service = await findServiceById(id);
    if (!service) {
        return res.status(409).send({ message: "Not found" })
    }

    res.status(200).send({ data: { service } });
}

export const updateService = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "Invalid request" });
    }

    const service = await findServiceById(id);
    if (!service) {
        return res.status(409).send({ message: "Not found" })
    }

    const { uid } = req.user!;
}

export const deleteService = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "Invalid request" });
    }

    const service = await findServiceById(id);
    if (!service) {
        return res.status(409).send({ message: "Not found" })
    }

}