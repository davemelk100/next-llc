import Image from 'next/image';
import { getBlogViews, getTweetCount, getStarCount } from 'lib/metrics';
import { name, about, bio, avatar, offerings, clients } from 'lib/info';

export const revalidate = 60;

export default async function HomePage() {
  let starCount, views, tweetCount;

  try {
    [starCount, views, tweetCount] = await Promise.all([
      getStarCount(),
      getBlogViews(),
      getTweetCount(),
    ]);
  } catch (error) {
    console.error(error);
  }

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">{name}</h1>
      <div className="flex items-start md:items-center my-8 flex-col md:flex-row">
        <Image
          alt={name}
          className="rounded-full grayscale"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
        <div className="mt-8 md:mt-0 ml-0 md:ml-6 space-y-2 text-neutral-500 dark:text-neutral-400">
         <p><i>Professional Services based around innvotive software development and 
           a commitment to client satisfaction above all else.</i></p>
        </div>
      </div>
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        {about()}
      </p>

      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        {bio()}
      </p>
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        {offerings()}
      </p>
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        {clients()}
      </p>
    </section>
  );
}
