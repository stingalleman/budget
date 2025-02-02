// Fixed colors
export const colors = [
  'rgb(0, 122, 255)',
  'rgb(52, 199, 89)',
  'rgb(255, 149, 0)',
  'rgb(88, 86, 214)',
  'rgb(255, 45, 85)',
  'rgb(175, 82, 222)',
  'rgb(255, 59, 48)',
  'rgb(90, 200, 250)',
  'rgb(255, 204, 0)',
]

export const state = () => ({
  data: {
    transactions: [],
    transactionsInPeriod: [],
    loading: true,
  },
  tagColors: {},
  // Get day 2 days before the start of the current month
  // Not great code, but oh well....
  from: '2000-01-01',
  until: '2000-01-01',
  viewingCat: '',
})

function applyFilter(state) {
  // Get "from" and "until" and make it so every transaction date under it
  const fromDate = new Date(state.from)
  const untilDate = new Date(state.until)
  const hour = 1e3 * 60 * 60

  // Filter transactions by date
  state.data.transactionsInPeriod = state.data.transactions.filter((v) => {
    const d = new Date(v.date)
    return (
      d.getTime() >= fromDate.getTime() - hour &&
      d.getTime() <= untilDate.getTime() + hour
    )
  })

  // Assign color for each tag
  // Get unique tags
  let allTags = state.data.transactions
    .map((v) => v.categories.map((v) => v.toString().trim().toLowerCase()))
    .flat()

  allTags = [
    ...new Set([
      ...allTags,
      'other',
      'groceries',
      'food',
      'monthly',
      'entertainment',
    ]),
  ] // Remove duplicates, also include 'other'

  // Assign color to each tag
  // const fullRange = 360
  for (const [i, name] of Object.entries(allTags)) {
    // const c = (Number(i) / allTags.length) * fullRange
    // state.tagColors[name] = `hsl(${c}, 100%, 50%)`
    state.tagColors[name] = colors[i % colors.length]
  }
}

export const mutations = {
  set(state, data) {
    // We might need to add other values here later
    // Setting the entire object breaks reactivity
    state.data.transactions = data.transactions
    state.data.loading = false
    applyFilter(state)
  },
  setLoading(state, bool) {
    state.data.loading = bool
  },
  setFrom(state, newFrom) {
    state.from = newFrom
    applyFilter(state)
  },
  setUntil(state, newUntil) {
    state.until = newUntil
    applyFilter(state)
  },
  setViewing(state, catName) {
    state.viewingCat = catName
  },
}
