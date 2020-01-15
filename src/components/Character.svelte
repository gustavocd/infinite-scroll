<script>
  import { relativeTime } from '../lib'

  export let character = {
    id: 0,
    image: '',
    name: '',
    created: '',
    status: '',
    species: '',
    gender: '',
    origin: '',
    location: '',
  }
</script>

<style>
  .character {
    min-width: 300px;
    border-radius: 0.625rem;
    overflow: hidden;
    margin-bottom: 0.625rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 2px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }

  .image-container {
    position: relative;
    width: 100%;
    background: rgb(32, 35, 41) none repeat scroll 0% 0%;
  }

  .image-container img {
    margin: 0;
    opacity: 1;
    transition: opacity 0.5s ease 0s;
  }

  .name-container {
    width: 100%;
    background: rgb(32, 35, 41) none repeat scroll 0% 0%;
    opacity: 0.8;
    position: absolute;
    bottom: 0px;
    padding: 0.625rem;
  }

  .name {
    color: rgb(245, 245, 245);
    font-size: 1.625rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    font-stretch: expanded;
  }

  .id {
    color: rgb(187, 187, 187);
    margin: 0;
    font-size: 0.875rem;
    letter-spacing: 0.5px;
  }

  .info {
    padding: 1.25rem;
    height: 100%;
    background: rgb(51, 51, 51) none repeat scroll 0% 0%;
  }

  .info > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    padding: 0.75rem 0px 0.375rem;
    border-bottom: 1px solid var(--boder-bottom-color);
  }

  .info > div span {
    font-size: 0.7rem;
    font-weight: 400;
    color: rgb(158, 158, 158);
  }

  .info > div span:nth-child(2) {
    color: var(--orange-color);
  }
</style>

<article class="character">
  <div class="image-container">
    <div>
      <img src={character.image} alt={character.name} />
    </div>
    <div class="name-container">
      <h2 class="name">{character.name}</h2>
      <p class="id">
        id: {character.id} - created {relativeTime(character.created)}
      </p>
    </div>
  </div>
  <div class="info">
    <div>
      <span>STATUS</span>
      <span>{character.status}</span>
    </div>
    <div>
      <span>SPECIES</span>
      <span>{character.species}</span>
    </div>
    <div>
      <span>GENDER</span>
      <span>{character.gender}</span>
    </div>
    <div>
      <span>ORIGIN</span>
      <span>{character.origin}</span>
    </div>
    <div>
      <span>LAST LOCATION</span>
      <span>{character.location}</span>
    </div>
  </div>
</article>
