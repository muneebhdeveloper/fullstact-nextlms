const useStyles = () => ({
  mainHeader: {
    textAlign: "center",
    minHeight: "280px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

function Jumbotron({ children }) {
  const styles = useStyles();
  return <div style={styles.mainHeader}>{children}</div>;
}

export default Jumbotron;
