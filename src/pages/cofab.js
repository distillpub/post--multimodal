export default (fn) => {
  return class extends React.Component {
    state = { data: null }
    fetchData = async () => {
      if (typeof window === 'undefined') return
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const url = urlParams.get('data_url')

      // local
      const data = await (await fetch(url)).json()
      this.setState({ data })
    }

    componentWillMount() {
      const { cofab } = this.props
      this.fetchData()
    }

    render() {
      const Fn = fn
      const { data, ...props } = this.props
      if (this.props.data) {
        return <Fn {...this.props.data} {...props} />
      }

      if (this.state.data) {
        return <Fn {...this.state.data} {...props} />
      }

      return <div>loading</div>
    }
  }
}
