var query = require('./db/query');
query.dropp(function(err) {
    if(err) { console.log(err); };
    insert();
});

function insert() {
    query.insertion(function(err) { 
        if(err) {
            console.log(err);
            process.exit(1);
        } else {
            process.exit(0);
        }
    });
}

function UpdateCol() {
    query.UpdateCol(function(err) { 
        if(err) {
            console.log(err);
            process.exit(1);
        } else {
            process.exit(0);
        }
    });
}