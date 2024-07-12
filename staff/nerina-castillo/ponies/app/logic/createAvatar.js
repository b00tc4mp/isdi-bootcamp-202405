import data from "../data/index";

import generateId from "../util/generateId";

const createAvatar = (image) => {
  if (!image.startsWith("http")) throw new Error("invalid image");


  const avatar = {
    id: generateId(),
    image: image,
    user: sessionStorage.username
  }

  data.insertAvatar(avatar)
}

export default createAvatar