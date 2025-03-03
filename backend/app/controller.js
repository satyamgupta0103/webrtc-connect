import {
  saveCallId as saveCallIdModel,
  getCallId as getCallIdModel,
} from "./model.js";

export const saveCallId = async (req, res) => {
  try {
    const { id, signalData } = req.body;
    await saveCallIdModel(id, signalData);
    res.status(200).send(true);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};

export const getCallId = async (req, res) => {
  try {
    const { id } = req.params;
    const code = await getCallIdModel(id);
    res.status(200).send({ code });
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};
