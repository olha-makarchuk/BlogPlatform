import { useOutletContext } from "react-router-dom";

function AuthorAbout() {
  const { author } = useOutletContext();

  return (
    <div className="author-social">
      <h4>Соціальні мережі:</h4>
      <ul>
        {author.socialLinks.twitter && (
          <li>
            <strong>Twitter: </strong>
            <a href={author.socialLinks.twitter}>
              {author.socialLinks.twitter}
            </a>
          </li>
        )}
        {author.socialLinks.github && (
          <li>
            <strong>GitHub: </strong>
            <a href={author.socialLinks.github}>{author.socialLinks.github}</a>
          </li>
        )}
        {author.socialLinks.linkedin && (
          <li>
            <strong>LinkedIn: </strong>
            <a href={author.socialLinks.linkedin}>
              {author.socialLinks.linkedin}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default AuthorAbout;
