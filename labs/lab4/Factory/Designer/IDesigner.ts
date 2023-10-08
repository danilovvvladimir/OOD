import PictureDraft from "../PictureDraft/PictureDraft";

interface IDesigner {
  createDraft(stream: NodeJS.ReadStream): PictureDraft;
}

export default IDesigner;
