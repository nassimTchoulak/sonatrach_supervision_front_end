function is_logged() { //put it in constructor ?

    let test ;
    try {


        if (localStorage.getItem("login") !== null) {
            test = localStorage.getItem("login");
        }
    }
    catch(e){
        test=null;

    }
    if(test===null){

        window.location.pathname="/login"
        return false

    }
    else{
        return true ;
    };

}
function deconnect() {
    localStorage.clear();

}
function setup_children(current, objects, children_relations) {
    let child ;
    for (let i = 0; i < children_relations[current].length; ++i) {
        child = children_relations[current][i];
        objects[current].children.push(objects[child]);
        setup_children(child, objects, children_relations);
    }
}

function transform(json_obj) {
    let objects = Object();
    let children_relations = Object();
    let roots = [];
    let id_to_obj_id = Object();
    let obj_id_to_id = Object();
    for (let id in json_obj) {
        let obj_id = json_obj[id].obj_id;
        id_to_obj_id[id] = obj_id;
        obj_id_to_id[obj_id] = id;
        children_relations[id] = [];
        objects[id] = json_obj[id];
        objects[id].children = [];
    }
    for (let id in json_obj) {
        if (json_obj[id].obj_pere == null) {
            roots.push(id);
        } else {
            let pere_id = obj_id_to_id[json_obj[id].obj_pere];
            children_relations[pere_id].push(id);
        }
    }
    for (let i = 0; i < roots.length; ++i) setup_children(roots[i], objects, children_relations);
    let res = [];
    for (let i = 0; i < roots.length; ++i) res.push(objects[roots[i]]);
    return res;
}
export { deconnect ,
    is_logged ,
transform};
