# Hello! Welcome to my assessment.

### Table of contents

- [Getting started](#getting-started)
- [Tech stack](#tech)
- [Things I got to](#got-to)
- [Things I wanted to get to](#wanted-to)

<section id="getting-started">

### Getting started

1. Ensure Docker is installed and the Docker daemon is running. If you're on MacOS, opening Docker Desktop will suffice.
2. Ensure yarn is installed. `sudo npm i -g yarn`
3. Start the project with `yarn docker:start` while in the root of the project directory.

`yarn docker:start` will build a Docker image of the project and spin up a database container as well.

Have fun breaking it!

</section>

<section id="tech">

### Tech stack (and why I went with it)

The tech stack was mainly chosen to align with your tech stack to refamiliarize myself with your choices (primarilly Prisma and NextJS)
as well as play with some of the newer features in React. We are still on React 16 at my current company 😬

You'll notice a lot of my decisions were based on time commitment. This was due to a fairly hectic week at work only allowing for ~6-7 hours of total time dedicated.

- I chose to use Next.JS for this assessment. My reasonings for using NextJS are:
  - File based routing
    - I, personally, find the structure to be more consice and easier to follow. Especially for API routes.
  - Tightly coupled backend and frontend
    - I was originally planning on utilizing Vite/React with a Nest.JS backend but realized it would be a lot simpler if everthing was tightly coupled together.
  - Serverless functions (on easy mode)
    - AWS has god awful UI/UX that I don't like messing with unless nessecary. Vercel handles that for me!
  - SSR
    - Responsive page load times alongside I haven't had an opportunity to play with it much.
- TypeScript
  - It's a superset of JS (which I like to call the linux of languages. In the sense of: you tell it to do something, it will kill itself trying to do it) and supports static typing. The best of both worlds if you ask me.
- SASS/SCSS
  - I dislike CSS frameworks/libraries because, usually, they just make your HTML/JSX clunkier. Like, why would I want a million and a half class names just to make a button look how I want it? An example of what I'm talking about: [outlined button with Tailwind](https://v1.tailwindcss.com/components/buttons#outline). Ridiculous. End of mini rant.
  - I also quite enjoy writing my own CSS (especially with SASS). It's therapeutic in a way. I wish I dedicated more time to doing this.
- Prisma with PostgreSQL
  - This was mainly to refamiliarize myself with Prisma. I haven't used it in a while. In my current role, I interface with Postgres through "[pg](https://www.npmjs.com/package/pg)" which isn't half bad but I'm tired of dealing with it. Especially when there is a mix of "legacy" code running SQL queries and an in-house ORM scattered around the codebase.
- Docker/Docker compose
  - This was purely used to allow for an easier setup/local start for you guys! No need to source a Postgres database now!

### Other library/framework considerations

- NestJS for the backend
  - I love NestJS's opinionated syntax and heavy use of Typescript. I would have really liked to have used it again but my deciding factor was the time commitment to sitting down and getting all of the boilerplate + initial setup with Next.JS out of the way.
  - If this application was going to be scaled in the future, I would have gone with NestJS so the code would be more easily maintained.
- Remix
  - Honestly, I would have gone with this if I was able to dedicate more time to this assessment. I've been wanting to play with it for a while now but just haven't had time. The deciding factor to avoid it was: I am more familiar with Next.JS and wasn't 100% sure what the deployment of the frontend + backend would look like with Vercel.
  - In a production envrionment I would still have to go with Next.JS over this simply due to Next.JS being more mature (automatic code splitting, CSS modules, etc) and already established with quite a few [large companies](https://nextjs.org/showcase) utilizing it.
- TypeORM
  - I have not used this yet and do not have an educated and first-hand opinion on it. I would have loved to use this assessment as an opportunity to finally have a chance to use it but did not due to time constraints.

</section>

<section id="got-to">

### Things I got to

- ## Submitting a ticket
- An admin dashboard to view all tickets
- A page to view the conversation and edit the details of a ticket
- A basic (serverless) backend
  - Honestly the routes could be refactored a bit. I'm not the most proud of them and would love to have a discussion about what can be done to improve them. I have a few ideas.
- Error handling
- Basic styling
  - If I had more time, I would have built a UI out in Figma and followed that.
- Form input validation
- SSR
  - At my current company we don't use SSR. I wanted to play with it a bit.
- Show/hide button for resolved tickets
  - This is a small, but helpful, addition to help with user experience. I would use it. I wouldn't want to be overwhelmed by the sheer volume of tickets. Especially if I could hide the resolved ones.

</section>

<section id="wanted-to">

### Things I did not get to but wanted to

- No authentication
  - I was originally planning on having the end user and the admin have their own accounts. This was cut once my "do end users need to be authenticated to submit a ticket" clarifying question was answered. With that, I also put admin authentication on the back burner and was unable to get to it.
- No testing
  - This would be an amazing thing to add. My reasoning for not including tests were purely as a time save.
- A way to change the title of a ticket after it was created
  - This would also have been a rather small but impactful addition for user experience (mor specifically admins).
- Global state with Redux
  - I chose not to implement this due to time constraints and how small of a scale the application is.
  - If it were going to production I would have invested the time into this. It would allow for a global authentication, error, and tickets state allowing for all of the data to be fetched when needed and cached/modified in state to improve responsivness. It would also allow for a more unified API experience as we could place all of our fetch calls into their respective reducers.
- More end user feedback
  - I would have loved to have a more responsive page for the user. Small things, like CSS hovers.
- Pagination
  - This wasn't the highest priority to me simply due to how small of a scale this application is. I would consider this to be fairly important if we were bringing this application to production as it would improve page load times for users with large volumes of tickets.
- Have the resolved tickets be shown at the bottom of the list
  - This another user experience feature I wanted to get to but ultimately ran out of time.

</section>
