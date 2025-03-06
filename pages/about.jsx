import { LikeButton, Parent } from '../components/like-button';


export default function AboutPage() {
  return <>
    <h1>About page</h1>
    <Parent />
    <LikeButton />
    <LikeButton big step={10} />
    <LikeButton start="100" bordered/>
    <LikeButton color="green" />

  </>
}