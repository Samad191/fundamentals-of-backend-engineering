import logo from './logo.svg';
import './App.css';

function App() {

  let sse;
 
   

  const handleClick = () => {
    console.log('click')
 
    sse = new EventSource('http://localhost:8080/stream')
    sse.onmessage = (event) => {
      console.log('message', event?.data)
    }
    console.log('outside message event')

  }

  const handleMultipleStreamEvents = () => {
    sse = new EventSource('http://localhost:8080/multipleStreams')
    sse.addEventListener('event1', (event) => {
      console.log('event1', event.data);
    });
  
    sse.addEventListener('event2', (event) => {
      console.log('event2', event.data);
    });

    sse.onopen = () => {
      console.log('Connection opened');
    };
  
    sse.onerror = (error) => {
      console.error('Error:', error);
    };
    
  }

  const handleClose = () => {
    console.log('close')
    sse.close()
  }

  return (
    <div className="App">
      <header className="App-header">
      <p>Server side events</p>
      <button onClick={handleClick} >Start</button>
      <button onClick={handleClose} >Close</button>
      <button onClick={handleMultipleStreamEvents} >Multiple Streams</button>
      </header>
    </div>
  );
}

export default App;
