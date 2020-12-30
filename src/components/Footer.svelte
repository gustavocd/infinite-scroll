<script>
  import { dependencies, devDependencies } from '../../package.json'
</script>

<style>
  .footer {
    display: flex;
    justify-content: center;
    color: #fff;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .footer a {
    color: inherit;
    text-decoration: underline;
  }
</style>

<footer class="footer">
  <span>
    Built with Svelte v{devDependencies.svelte.slice(1)} & XState v{dependencies.xstate.slice(1)}
    original design by &nbsp;
  </span>
  <a href="https://axelfuhrmann.com/" target="_blank" rel="noopener">
    Axel Fuhrmann
  </a>
</footer>
