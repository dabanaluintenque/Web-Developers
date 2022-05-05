
let xhttp = new XMLHttpRequest();

xhttp.addEventListener('load', success);
xhttp.addEventListener('error', error);
xhttp.open("GET", "/users/timeoverViewOut", true);
//xhttp.open("POST", "/users/timeoverView", true);
xhttp.send();



function success(){

    let data = JSON.parse(xhttp.response);

    let rows = data.map((row)=>
    <tr key ={JSON.stringify(row)}>

         <td>{row.id}</td>
         <td>{row.username}</td>
         <td>{row.day}</td>
         <td>{row.screentime}</td>
         <td>{row.workout}</td>
         <td>{row.reading}</td>
         <td>{row.selfcare}</td>
         <td>{row.sleep}</td>
         <td>{row.pray}</td>
         <td>{row.fun}</td>
        <td>{row.work}</td>
        <td>{row.description}</td>

    </tr>
    );

    

    console.log(rows);

    let element = (

        <div>
            <table id="createTable">

                <thead>
                    <tr><th>ID</th><th>Username</th><th>Day</th><th>Screentime</th><th>Workout</th><th>Reading</th><th>Selfcare</th><th>Sleep</th><th>Pray</th><th>Fun</th><th>Work</th><th>Description</th></tr>
                </thead>

                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>

        
    );

    ReactDOM.render(
        element,
        document.getElementById('dates')

        
    );

   const dataTable = new simpleDatatables.DataTable("#createTable");
}

function error(){

    console.log(xhttp.readyState);
    console.log(xhttp.status);
}