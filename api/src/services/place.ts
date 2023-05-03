import Place from '../models/Place';

export async function createPlace(data) {
  try {
    return await Place.create(data);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

export async function getPlace(id) {
  try {
    return await Place.findById(id);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}
