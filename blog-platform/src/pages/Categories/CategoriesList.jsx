import { categories } from "../../data/mockCategories";
import "./CategoriesList.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

function CategoriesList() {
  return (
    <div className="categories-list">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={ROUTES.CATEGORIES.DETAIL(category.slug)}
          className="category-link"
        >
          <div className="category-card">
            <div className="category-main">
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              <span className="category-count">
                {category.postsCount} статей
              </span>
            </div>

            <div className="category-description">
              {category.description}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CategoriesList;
