

const Test = ({appId}) => {
  return (
    <>
      <h1>
        This is The Test
      </h1>
    {appId && <h2> {appId} </h2>}
      
    </>
  )
}

export default Test