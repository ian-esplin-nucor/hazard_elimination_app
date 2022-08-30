const baseIp = "http://localhost:3007";
// const baseIp = "http://vcbg1apps01:3007";
const addFile = new URL(baseIp + "/file");
const hazard = new URL(baseIp + '/hazard');

module.exports= {
    addFile,
    hazard
}