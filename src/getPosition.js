export function getPosition(position) {
    let arr = position.split(",");
    arr.y = Number(arr[0]);
    arr.x = Number(arr[1]);
    arr.toString = function () {
      return this.y + ',' + this.x;
    }
    return arr;
  }