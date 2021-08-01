import {getSongUrl} from "@/api/song";

export async function getUrl(id) {
  try {
    let songUrl = "";
    let res = await getSongUrl(id);
    if (!res.data || !res.data.length) {
      songUrl = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    } else if (res.data[0].url) {
      songUrl = res.data[0].url;
    }
    return songUrl;
  } catch (error) {
    console.log(error);
    return "";
  }
}