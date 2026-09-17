import {useEffect, useMemo, useState} from 'react'
import './App.css'
import './affiliate.css'

type Category = { categoryId: number; name: string; parentId: number }
type Product = {
    productId: number;
    name: string;
    description: string;
    categoryId: number;
    price: number;
    imageUrl: string;
    affiliateLink: string
}
type ApiResponse<T> = { data: T[]; total: number }

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

const categoryImages: Record<string, string> = {
    Tops: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85',
    Dresses: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85',
    Skirts: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=85',
    Pants: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85',
    Accessories: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=85',
}

const fallbackImage = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85'

function formatPrice(price: number) {
    return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND', maximumFractionDigits: 0}).format(price)
}

function App() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [categories, setCategories] = useState<Category[]>([])
    const [activeParentId, setActiveParentId] = useState<number | null>(null)
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [categoriesError, setCategoriesError] = useState('')
    const [productsError, setProductsError] = useState('')
    const [loadingCategories, setLoadingCategories] = useState(true)
    const [loadingProducts, setLoadingProducts] = useState(false)

    useEffect(() => {
        const controller = new AbortController()

        async function loadCategories() {
            try {
                setLoadingCategories(true)
                const response = await fetch(`${API_BASE_URL}/categories`, {signal: controller.signal})
                if (!response.ok) throw new Error('Unable to load categories')
                const payload: ApiResponse<Category> = await response.json()
                const firstParent = payload.data.find((category) => category.parentId === 0)
                setCategories(payload.data)
                setActiveParentId(firstParent?.categoryId ?? null)
                setActiveCategoryId(payload.data.find((category) => category.parentId === firstParent?.categoryId)?.categoryId ?? null)
            } catch (error) {
                if (!(error instanceof DOMException && error.name === 'AbortError')) setCategoriesError('Không thể tải danh mục. Vui lòng thử lại sau.')
            } finally {
                setLoadingCategories(false)
            }
        }

        void loadCategories()
        return () => controller.abort()
    }, [])

    useEffect(() => {
        if (activeCategoryId === null) return
        const controller = new AbortController()

        async function loadProducts() {
            try {
                setLoadingProducts(true);
                setProductsError('')
                const response = await fetch(`${API_BASE_URL}/products?categoryId=${activeCategoryId}`, {signal: controller.signal})
                if (!response.ok) throw new Error('Unable to load products')
                const payload: ApiResponse<Product> = await response.json()
                setProducts(payload.data)
            } catch (error) {
                if (!(error instanceof DOMException && error.name === 'AbortError')) setProductsError('Không thể tải sản phẩm của danh mục này.')
            } finally {
                setLoadingProducts(false)
            }
        }

        void loadProducts()
        return () => controller.abort()
    }, [activeCategoryId])

    const parentCategories = useMemo(() => categories.filter((category) => category.parentId === 0), [categories])
    const subcategories = useMemo(() => categories.filter((category) => category.parentId === activeParentId), [categories, activeParentId])
    const activeParent = parentCategories.find((category) => category.categoryId === activeParentId)
    const activeCategory = subcategories.find((category) => category.categoryId === activeCategoryId)
    const visibleProducts = products.filter((product) => product.name.toLocaleLowerCase('vi-VN').includes(searchQuery.trim().toLocaleLowerCase('vi-VN')))

    function chooseParent(categoryId: number) {
        setActiveParentId(categoryId)
        setActiveCategoryId(categories.find((category) => category.parentId === categoryId)?.categoryId ?? null)
    }

    function chooseSubcategory(categoryId: number) {
        setActiveCategoryId(categoryId)
        document.querySelector('#shop')?.scrollIntoView({behavior: 'smooth', block: 'start'})
    }

    return <div className="atelier">
        <div className="announcement">AFFIHUB CURATES <span>•</span> We may earn a commission from partner links
        </div>
        <header className="site-header">
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Open menu">{menuOpen ? '×' : '☰'}</button>
            <a className="wordmark" href="#top">AFFI <small>HUB</small></a>
            <nav className={menuOpen ? 'main-nav open' : 'main-nav'}><a href="#new">DISCOVER</a><a href="#shop">PICKS</a><a
                href="#edit">GUIDES</a><a href="#about">ABOUT</a></nav>
            <div className="header-tools">
                <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">⌕</button>
                <a href="#about">ABOUT</a>
            </div>
        </header>
        {searchOpen &&
            <div className="search-drawer"><label htmlFor="catalogue-search">Search recommended products</label><input
                id="catalogue-search" autoFocus value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)} placeholder="Try “linen dress”"/>
                <button onClick={() => setSearchOpen(false)}>Close</button>
            </div>}

        <main id="top">
            <section className="hero" id="new">
                <div className="hero-content"><p className="overline">AUTUMN / WINTER 2026</p>
                    <h1>Find pieces<br/><em>worth knowing.</em></h1><p>Curated fashion finds, organised so you can make a confident choice faster.</p><a
                        href="#shop" className="button-link">BROWSE OUR PICKS <span>→</span></a></div>
                <div className="hero-note"><span>01</span> Curated links. Your choice.</div>
            </section>

            <section className="category-explorer" aria-labelledby="category-heading">
                <div className="section-intro"><p className="overline">CURATED FOR YOU</p><h2
                    id="category-heading">Start with<br/><em>your style.</em></h2><p>Browse our fashion edit by category, then open a recommendation with a trusted partner.</p></div>
                {loadingCategories && <p className="status">Đang tải danh mục…</p>}{categoriesError &&
                <p className="status error">{categoriesError}</p>}
                <div className="category-layout">
                    <div className="parent-categories">{parentCategories.map((category, index) => <button
                        key={category.categoryId} onClick={() => chooseParent(category.categoryId)}
                        className={activeParentId === category.categoryId ? 'parent-category selected' : 'parent-category'}>
                        <img src={categoryImages[category.name] ?? fallbackImage}
                             alt=""/><span>{String(index + 1).padStart(2, '0')}</span><strong>{category.name}</strong><i>↗</i>
                    </button>)}</div>
                    <aside className="subcategory-panel"><p
                        className="overline">EXPLORE {activeParent?.name?.toUpperCase()}</p>
                        <h3>{activeParent?.name ?? 'Collection'}</h3>
                        <div>{subcategories.map((category, index) => <button key={category.categoryId}
                                                                             onClick={() => chooseSubcategory(category.categoryId)}
                                                                             className={activeCategoryId === category.categoryId ? 'selected' : ''}>
                            <span>{String(index + 1).padStart(2, '0')}</span>{category.name}<b>→</b></button>)}</div>
                    </aside>
                </div>
            </section>

            <section className="product-section" id="shop">
                <div className="product-heading">
                    <div><p
                        className="overline">{activeParent?.name?.toUpperCase()} / {activeCategory?.name?.toUpperCase()}</p>
                        <h2>{activeCategory?.name ?? 'Our picks'}</h2></div>
                    <p>{visibleProducts.length} recommendations</p></div>
                {loadingProducts && <p className="status">Đang tải gợi ý…</p>}{productsError &&
                <p className="status error">{productsError}</p>}{!loadingProducts && !productsError && activeCategory && visibleProducts.length === 0 &&
                <p className="status">Chưa có sản phẩm trong danh mục này.</p>}
                <div className="product-grid">{visibleProducts.map((product) => <article className="product-card"
                                                                                         key={product.productId}><a
                    className="product-photo" href={product.affiliateLink} target="_blank"
                    rel="noopener noreferrer"><img src={product.imageUrl || fallbackImage} alt={product.name}/><span>XEM GỢI Ý</span></a>
                    <div className="product-copy">
                        <div><p>{activeCategory?.name}</p><h3>{product.name}</h3></div>
                        <strong>{formatPrice(product.price)}</strong><a className="partner-link" href={product.affiliateLink}
                        target="_blank" rel="noopener noreferrer">XEM TẠI ĐỐI TÁC →</a></div>
                </article>)}</div>
            </section>

            <section className="journal" id="edit">
                <div className="journal-image"/>
                <div className="journal-copy"><p className="overline">HOW WE CURATE</p><h2>Less noise.<br/>Better <em>finds.</em></h2><p>AffiHub collects products worth considering, then sends you directly to the partner store to decide.</p><a href="#shop">EXPLORE RECOMMENDATIONS <span>→</span></a></div>
            </section>
            <section className="about-strip" id="about"><span>AFFIHUB DISCLOSURE</span><p>We curate independently. Some outbound links are affiliate links and may earn us a commission.</p><a href="#top">BACK TO TOP ↑</a></section>
        </main>
        <footer><a className="wordmark" href="#top">AFFI <small>HUB</small></a>
            <div><a href="#top">Instagram</a><a href="#top">Contact</a><a href="#about">Affiliate disclosure</a></div>
            <small>© 2026 AFFIHUB</small></footer>
        <nav className="mobile-dock" aria-label="Quick navigation"><a href="#top"><span>⌂</span>Home</a><a href="#shop"><span>⌕</span>Picks</a><button onClick={() => setSearchOpen(true)}><span>⌗</span>Find</button><a href="#edit"><span>✦</span>Guides</a><a href="#about"><span>i</span>About</a></nav>
    </div>
}

export default App
