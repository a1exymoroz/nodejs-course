const db = {
    Users: [],
    Boards: [],
    Tasks: [],
    fixUsersStructure: user => {
        if (user) {
            db.Tasks.filter(task => task).forEach(task => {
                task.userId = task.userId === user.id ? null : task.user.Id
            })
        }
    }
    fixBoardsStructure: board => {
        if (board) {
            db.Tasks.filter(task => task && task.boardId === board.id).forEach(task => (db.Tasks[db.Tasks.indexOf(task)] = undefined))
        }
    }
}

// init DB with mock data

(()=>{
for (let i = 0; i < 3; i++) {
    
}
})()