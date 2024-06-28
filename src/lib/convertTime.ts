export default function (duration: number) {
  let hours = String(Math.floor(duration / 3600));
  let minutes = String(Math.floor((duration - +hours * 3600) / 60));
  let seconds = String(Math.floor(duration - +hours * 3600 - +minutes * 60));

  if (+hours < 10) {
    hours = "0" + hours;
  }
  if (+minutes < 10) {
    minutes = "0" + minutes;
  }
  if (+seconds < 10) {
    seconds = "0" + seconds;
  }
  const str = (+hours > 0 ? hours + ":" : "") + minutes + ":" + seconds;
  return str.includes("NaN") ? "" : str;
}
