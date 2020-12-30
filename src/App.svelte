<script>
  import { onMount, onDestroy } from 'svelte'
  import { interpret } from 'xstate'

  import { transformCharacter, fetchCharacters } from './lib'
  import scrollMachine from './lib/scrollMachine'
  import Header from './components/Header.svelte'
  import Loader from './components/Loader.svelte'
  import Character from './components/Character.svelte'
  import Footer from './components/Footer.svelte'

  const machine = scrollMachine.withConfig({
    services: { fetchCharacters },
  })
  const service = interpret(machine).start()

  let options = {
    root: document.getElementById('scrollArea'),
    rootMargin: '0px',
    threshold: 0.5,
  }

  let observer = new IntersectionObserver(event => {
    const [entries] = event
    if (!entries.isIntersecting || !$service.context.pageInfo.next) {
      return
    }
    service.send({ type: 'FETCH_MORE' })
  }, options)

  onMount(() => {
    service.send({ type: 'FETCH' })
    observer.observe(document.querySelector('footer'))
  })

  onDestroy(() => {
    observer.unobserve(document.querySelector('footer'))
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

  .loader,
  .error {
    padding-top: var(--padding-lg);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error {
    color: var(--orange-color);
    font-size: 18px;
  }
</style>

<Header />
<section class="container" id="scrollArea">
  {#if $service.matches('success') || $service.matches('loadMore')}
    <div class="inner">
      {#each $service.context.characters as character (character.id)}
        <Character {character} />
      {/each}
    </div>
  {/if}
  {#if $service.matches('failure')}
    <div class="error">
      <span>{$service.context.error}</span>
    </div>
  {/if}
  {#if $service.matches('loading') || $service.matches('loadMore')}
    <div class="loader">
      <Loader />
    </div>
  {/if}
  <Footer />
</section>
