import { categories } from "../../data/mockCategories";
import { authors } from "../../data/mockAuthors";
import "./FilterSidebar.css";

function FilterSidebar({
  selectedCategories,
  onCategoryChange,
  selectedAuthor,
  onAuthorChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="filter-sidebar">
      <div className="filter-group">
        <h4>Категорії</h4>

        {categories.map((category) => (
          <label key={category.id}>
            <input
              type="checkbox"
              value={category.id}
              checked={selectedCategories.includes(category.id)}
              onChange={(e) =>
                onCategoryChange(Number(e.target.value), e.target.checked)
              }
            />
            {category.name}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Автори</h4>

        <select
          value={selectedAuthor || ""}
          onChange={(e) =>
            onAuthorChange(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">Всі автори</option>

          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <h4>Сортування</h4>

        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="date">За датою</option>
          <option value="views">За популярністю</option>
          <option value="title">За назвою</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSidebar;
