const CustomListItem = (props) => {
  return (
    <div>
      <p>Welcome to my custom ListItem for field "Group"</p>
      <pre>
        {JSON.stringify(props.value.fields)}
      </pre>
    </div>
  )
}

export default CustomListItem