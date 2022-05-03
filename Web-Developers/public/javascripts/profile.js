
const urlParams2 = new URLSearchParams(window.location.search);

const message = urlParams2.get('message');


if(message){

    let element = (

        <p>{message}</p>
    );

    ReactDOM.render(


        element,

        document.getElementById('message')
    );
} 

