export const centerGameObjects = (objects) => {
    objects.forEach(function (object) {
        object.anchor.setTo(0.5);
    });
};

export function smartSetHeight(obj, height) {
    let aspectRatio = obj.width / obj.height;
    obj.height = height;
    obj.width = aspectRatio * obj.height;
}


export function smartSetWidth(obj, width) {
    let aspectRatio = obj.width / obj.height;
    obj.width = width;
    obj.height = obj.width / aspectRatio;
}
