const timeConversion = (time) => {
  const hour = Math.floor((time / (60 * 60 * 1000)) % 24)
  const minute = Math.floor((time / (60 * 1000)) % 60)
  const second = Math.floor((time / 1000) % 60)

  return `${minute < 10 ? `0${minute}`: minute}:${second < 10 ? `0${second}`: second}`
};

export default timeConversion