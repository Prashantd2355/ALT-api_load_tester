

export default function Process(){
  return (
    <div>
        <button onClick={()=>{
          window.electronAPI.processData();
        }}> click me</button>
    </div>
  )
}
