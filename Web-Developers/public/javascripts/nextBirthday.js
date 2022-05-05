

const urlParams = new URLSearchParams(window.location.search);

const message = urlParams.get('message');


if(message){

    let element = (

        <p>{message}</p>
    );

    ReactDOM.render(


        element,

        document.getElementById('message')
    );
}