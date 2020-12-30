<script>
  import { onMount } from 'svelte'
  import { transformCharacter } from './lib'
  import Header from './components/Header.svelte'
  import Loader from './components/Loader.svelte'
  import Character from './components/Character.svelte'
  import Footer from './components/Footer.svelte'

  let loading = true
  let characters = []
  let pageInfo = {}
  let options = {
    root: document.getElementById('scrollArea'),
    rootMargin: '0px',
    threshold: 0.5,
  }
  let observer = new IntersectionObserver(handleIntersection, options)

  async function handleIntersection(event) {
    const [entries] = event
    loading = true
    try {
      if (!entries.isIntersecting || !pageInfo.next) {
        loading = false
        return
      }
      const blob = await fetch(pageInfo.next)
      const { results, info } = await blob.json()
      characters = [
        ...characters,
        ...results.map(result => transformCharacter(result)),
      ]
      pageInfo = info
      loading = false
    } catch (error) {
      loading = false
      console.log(error)
    }
  }

  onMount(async () => {
    try {
      const blob = await fetch('https://rickandmortyapi.com/api/character')
      const { results, info } = await blob.json()
      characters = results.map(result => transformCharacter(result))
      pageInfo = info
      loading = false
      observer.observe(document.querySelector('footer'))
    } catch (error) {
      loading = false
      console.log(error)
    }
  })
</script>

<style>
  .container {
    min-height: 50vh;
    background-color: var(--text-color);
  }

  .inner {
    max-width: 80em;
    margin: 0 auto;
    padding: 3rem 0;
    display: grid;
    grid-gap: 20px;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<Header />
<section class="container" id="scrollArea">
  <div class="inner">
    {#each characters as character (character.id)}
      <Character {character} />
    {/each}
  </div>
  <div class="loader">
    {#if loading}
      <Loader />
    {/if}
  </div>
  <Footer />
</section>
