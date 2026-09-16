import {useState, type ReactNode} from 'react'
import './App.css'

// Data types keep storefront content type-safe.
type ProductCategory = 'tops' | 'trousers' | 'skirts' | 'dresses'

type Category = {
    id: ProductCategory
    name: string
    index: string
    description: string
    image: string
}

type Product = {
    category: ProductCategory
    name: string
    price: string
    image: string
    tag: string
    shopeeLink: string
}

// Product categories use stable English identifiers; labels are kept separate for display.
const categories: Category[] = [
    {
        id: 'tops',
        name: 'Tops',
        index: '01',
        description: 'Essential layers, refined',
        image: 'https://images.unsplash.com/photo-1564257576244-44b994ccbd09?auto=format&fit=crop&w=900&q=85',
    },
    {
        id: 'trousers',
        name: 'Trousers',
        index: '02',
        description: 'Easy, tailored silhouettes',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85',
    },
    {
        id: 'skirts',
        name: 'Skirts',
        index: '03',
        description: 'Soft movement for every day',
        image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=85',
    },
    {
        id: 'dresses',
        name: 'Dresses',
        index: '04',
        description: 'Effortless statement pieces',
        image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85',
    },
]

// The catalogue. Add a new product object here.
// category must match a ProductCategory identifier above.
// shopeeLink: Replace this with your Shopee affiliate link.
const products: Product[] = [
    {
        category: 'tops',
        name: 'Draped Neckline Blouse',
        price: '649.000₫',
        image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85',
        tag: 'New',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'tops',
        name: 'Ribbed Cotton Shirt',
        price: '695.000₫',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'tops',
        name: 'Crew-Neck Knit Top',
        price: '590.000₫',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85',
        tag: 'Best Seller',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'tops',
        name: 'Tweed Jacket',
        price: '1.290.000₫',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85',
        tag: 'New',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'tops',
        name: 'Cropped Linen Blazer',
        price: '1.090.000₫',
        image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'tops',
        name: 'Button-Front Cardigan',
        price: '625.000₫',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=900&q=85',
        tag: 'New',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'tops',
        name: 'V-Neck Knit Vest',
        price: '520.000₫',
        image: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'tops',
        name: 'Fitted Ribbed T-Shirt',
        price: '390.000₫',
        image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=900&q=85',
        tag: 'Best Seller',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'trousers',
        name: 'Wide-Leg Tailored Trousers',
        price: '749.000₫',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85',
        tag: 'New',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'trousers',
        name: 'High-Rise Linen Trousers',
        price: '695.000₫',
        image: 'https://images.unsplash.com/photo-1506629905607-d405b7a30db9?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'trousers',
        name: 'Straight-Fit Jeans',
        price: '790.000₫',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85',
        tag: 'Best Seller',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'trousers',
        name: 'Wool-Blend Shorts',
        price: '550.000₫',
        image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'trousers',
        name: 'Draped Culottes',
        price: '720.000₫',
        image: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=900&q=85',
        tag: 'New',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'trousers',
        name: 'Straight-Leg Khaki Trousers',
        price: '680.000₫',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'trousers',
        name: 'Pleated Palazzo Trousers',
        price: '790.000₫',
        image: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?auto=format&fit=crop&w=900&q=85',
        tag: 'Best Seller',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'trousers',
        name: 'Premium Joggers',
        price: '640.000₫',
        image: 'https://images.unsplash.com/photo-1506629905607-d405b7a30db9?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'skirts',
        name: 'Pleated Midi Skirt',
        price: '690.000₫',
        image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=85',
        tag: 'New',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'skirts',
        name: 'Long Silk Skirt',
        price: '720.000₫',
        image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'skirts',
        name: 'A-Line Mini Skirt',
        price: '580.000₫',
        image: 'https://images.unsplash.com/photo-1548624149-fb5a4c0195cf?auto=format&fit=crop&w=900&q=85',
        tag: 'Best Seller',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'skirts',
        name: 'Classic Pencil Skirt',
        price: '640.000₫',
        image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'skirts',
        name: 'Fringed Tweed Skirt',
        price: '850.000₫',
        image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=900&q=85',
        tag: 'New',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'skirts',
        name: 'Asymmetric Satin Skirt',
        price: '760.000₫',
        image: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'skirts',
        name: 'Long Denim Skirt',
        price: '695.000₫',
        image: 'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=900&q=85',
        tag: 'Best Seller',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'skirts',
        name: 'Soft Wrap Skirt',
        price: '675.000₫',
        image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'dresses',
        name: 'Relaxed Midi Dress',
        price: '895.000₫',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85',
        tag: 'Best Seller',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'dresses',
        name: 'Puff-Sleeve Square-Neck Dress',
        price: '990.000₫',
        image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85',
        tag: 'New',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'dresses',
        name: 'One-Shoulder Silk Dress',
        price: '1.150.000₫',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'dresses',
        name: 'Waist-Tie Maxi Dress',
        price: '1.090.000₫',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'dresses',
        name: 'Floral V-Neck Dress',
        price: '935.000₫',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85',
        tag: 'New',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'dresses',
        name: 'Fitted Knit Dress',
        price: '860.000₫',
        image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'dresses',
        name: 'Belted Shirt Dress',
        price: '1.020.000₫',
        image: 'https://images.unsplash.com/photo-1566479179817-c0bf0d1d7bb0?auto=format&fit=crop&w=900&q=85',
        tag: 'Best Seller',
        shopeeLink: 'https://shopee.vn'
    },
    {
        category: 'dresses',
        name: 'Black Cocktail Dress',
        price: '1.290.000₫',
        image: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=900&q=85',
        tag: '',
        shopeeLink: 'https://shopee.vn'
    },
]

// Keep decorative icon characters out of screen-reader output.
function Icon({children}: { children: ReactNode }) {
    return <span className="icon" aria-hidden="true">{children}</span>
}

function App() {
    // Controls the mobile menu, product search, and selected category.
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState<ProductCategory>('tops')
    const activeCategoryDetails = categories.find((category) => category.id === activeCategory)!

    // Only show products in the selected category that match the search query.
    const selectedProducts = products.filter(
        (product) => product.category === activeCategory
            && product.name.toLocaleLowerCase('vi-VN').includes(searchQuery.trim().toLocaleLowerCase('vi-VN')),
    )

    function selectCategory(categoryId: ProductCategory) {
        setActiveCategory(categoryId)
        document.querySelector('#products')?.scrollIntoView({behavior: 'smooth'})
    }

    return (
        <div className="storefront">
            {/* Site header with brand, navigation, and actions. */}
            <header className="site-header">
                <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
                    <Icon>☰</Icon>
                </button>
                <a className="brand" href="#top" aria-label="Mono Studio home">MONO<span>STUDIO</span></a>
                <nav className={menuOpen ? 'navigation open' : 'navigation'}>
                    <a href="#top">HOME</a>
                    <a href="#products">SHOP <small>⌄</small></a>
                    <a href="#collection">NEW COLLECTION</a>
                    <a href="#about">ABOUT US</a>
                </nav>
                <div className="header-actions">
                    <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Icon>⌕</Icon></button>
                    <button aria-label="Account"><Icon>♙</Icon></button>
                    <button className="bag" aria-label="Shopping bag"><Icon>▢</Icon><b>0</b></button>
                </div>
            </header>

            {/* The search panel opens from the header action. */}
            {searchOpen && <div className="search-panel"><input autoFocus value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)} placeholder={`Search ${activeCategoryDetails.name.toLowerCase()}...`}
                aria-label={`Search ${activeCategoryDetails.name}`}/>
                <button onClick={() => setSearchOpen(false)}>Close</button>
            </div>}

            <main id="top">
                {/* Campaign hero. */}
                <section className="hero">
                    <div className="hero-copy"><p className="eyebrow">PRE-FALL COLLECTION ’26</p><h1>Made for<br/>
                        modern elegance</h1><p>New designs for an effortless, confident way of living.</p><a
                        className="button" href="#products">SHOP THE COLLECTION <span>→</span></a></div>
                </section>

                {/* Category cards filter the catalogue below. */}
                <section className="category-section" aria-label="Product categories">
                    <div className="categories">{categories.map((category) => <button
                        className={activeCategory === category.id ? 'category-card active' : 'category-card'}
                        key={category.id} onClick={() => selectCategory(category.id)} aria-label={`View ${category.name}`}><img src={category.image} alt=""/><span
                        className="category-number">{category.index}</span>
                        <div><strong>{category.name}</strong><small>{category.description}</small></div>
                        <i>↗</i></button>)}</div>
                </section>

                <section className="intro" id="about"><p className="eyebrow">THE MODERN ESSENCE</p><h2>Wear it<br/>
                    your way.</h2><p>Mono Studio celebrates natural beauty through considered silhouettes and refined
                    details.</p><a href="#products" className="text-link">OUR STORY <span>→</span></a></section>

                {/* The product grid updates when the category or search query changes. */}
                <section className="product-section" id="products">
                    <div className="section-heading">
                        <div><p className="eyebrow">{activeCategoryDetails.name.toUpperCase()} / {selectedProducts.length} PRODUCTS</p>
                            <h2>Selected {activeCategoryDetails.name}</h2></div>
                        <a href="#products">VIEW ALL <span>→</span></a></div>
                    <div className="product-grid">{selectedProducts.map((product) => <article className="product"
                                                                                              key={product.name}><div className="product-image"><a
                        className="product-image-link" href={product.shopeeLink} target="_blank"
                        rel="noopener noreferrer"><img src={product.image} alt={product.name}/></a>{product.tag &&
                        <span>{product.tag}</span>}
                        <button aria-label={`Shop ${product.name} on Shopee`} onClick={() =>
                            window.open(product.shopeeLink, '_blank', 'noopener,noreferrer')}>🛒</button>
                    </div>
                        <div className="product-info"><h3><a href={product.shopeeLink} target="_blank"
                                                             rel="noopener noreferrer" style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}>{product.name}</a></h3><p>{product.price}</p></div>
                    </article>)}</div>
                </section>

                <section className="editorial" id="collection">
                    <div className="editorial-photo"/>
                    <div className="editorial-copy"><p className="eyebrow">THE EDIT</p><h2>Ease into<br/>the new season
                    </h2><p>Soft textures and neutral tones create a wardrobe that lasts beyond the season.</p><a
                        className="button button-light" href="#products">VIEW COLLECTION <span>→</span></a></div>
                </section>
            </main>

            <footer><a className="brand" href="#top">MONO<span>STUDIO</span></a><p>Designed for everyday confidence.</p>
                <div><a href="#top">Instagram</a><a href="#top">Facebook</a><a href="#top">Contact</a></div>
                <small>© 2026 MONO STUDIO. ALL RIGHTS RESERVED.</small></footer>
        </div>
    )
}

export default App
