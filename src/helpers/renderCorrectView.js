export const renderCorrectView = (loading, error, data, view) => {
  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return (
      <p>
        I am sad to say that the following error was just reported :
        {JSON.stringify(error)}
      </p>
    );
  }
  if (data) {
    return view
  }
}
