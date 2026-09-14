import { useState, type ReactNode } from 'react'
import './App.css'

// Kiểu dữ liệu giúp TypeScript kiểm tra thông tin hiển thị trên trang.
type Category = {
  id: string
  index: string
  description: string
  image: string
}

type Product = {
  category: string
  name: string
  price: string
  image: string
  tag: string
}

// Danh mục xuất hiện trong phần "Shop by category".
const categories: Category[] = [
  {
    id: 'Áo',
    index: '01',
    description: 'Tối giản, thanh lịch',
    image: 'https://images.unsplash.com/photo-1564257576244-44b994ccbd09?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'Quần',
    index: '02',
    description: 'Phom dáng tự do',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'Chân váy',
    index: '03',
    description: 'Nét mềm mại mỗi ngày',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'Đầm',
    index: '04',
    description: 'Dịu dàng và nổi bật',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85',
  },
]

// Toàn bộ sản phẩm. Muốn thêm sản phẩm mới, chỉ cần thêm một object tại đây.
// category phải trùng với id của một danh mục ở phía trên.
const products: Product[] = [
  { category: 'Áo', name: 'Áo blouse cổ đổ', price: '649.000₫', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85', tag: 'Mới' },
  { category: 'Áo', name: 'Sơ mi cotton đường gân', price: '695.000₫', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85', tag: '' },
  { category: 'Áo', name: 'Áo knit cổ tròn', price: '590.000₫', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85', tag: 'Bán chạy' },
  { category: 'Áo', name: 'Áo khoác tweed', price: '1.290.000₫', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85', tag: 'Mới' },
  { category: 'Áo', name: 'Áo vest linen dáng ngắn', price: '1.090.000₫', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=900&q=85', tag: '' },
  { category: 'Áo', name: 'Áo len cài nút', price: '625.000₫', image: 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=900&q=85', tag: 'Mới' },
  { category: 'Áo', name: 'Áo gile cổ V', price: '520.000₫', image: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=900&q=85', tag: '' },
  { category: 'Áo', name: 'Áo thun rib ôm dáng', price: '390.000₫', image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=900&q=85', tag: 'Bán chạy' },
  { category: 'Quần', name: 'Quần âu ống rộng', price: '749.000₫', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85', tag: 'Mới' },
  { category: 'Quần', name: 'Quần linen cạp cao', price: '695.000₫', image: 'https://images.unsplash.com/photo-1506629905607-d405b7a30db9?auto=format&fit=crop&w=900&q=85', tag: '' },
  { category: 'Quần', name: 'Quần jeans straight fit', price: '790.000₫', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85', tag: 'Bán chạy' },
  { category: 'Quần', name: 'Quần short wool blend', price: '550.000₫', image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=900&q=85', tag: '' },
  { category: 'Quần', name: 'Quần culottes mềm rủ', price: '720.000₫', image: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=900&q=85', tag: 'Mới' },
  { category: 'Quần', name: 'Quần kaki ống đứng', price: '680.000₫', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85', tag: '' },
  { category: 'Quần', name: 'Quần palazzo xếp ly', price: '790.000₫', image: 'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?auto=format&fit=crop&w=900&q=85', tag: 'Bán chạy' },
  { category: 'Quần', name: 'Quần jogger premium', price: '640.000₫', image: 'https://images.unsplash.com/photo-1506629905607-d405b7a30db9?auto=format&fit=crop&w=900&q=85', tag: '' },
  { category: 'Chân váy', name: 'Chân váy midi xếp ly', price: '690.000₫', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=85', tag: 'Mới' },
  { category: 'Chân váy', name: 'Chân váy lụa dáng dài', price: '720.000₫', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85', tag: '' },
  { category: 'Chân váy', name: 'Chân váy mini chữ A', price: '580.000₫', image: 'https://images.unsplash.com/photo-1548624149-fb5a4c0195cf?auto=format&fit=crop&w=900&q=85', tag: 'Bán chạy' },
  { category: 'Chân váy', name: 'Chân váy bút chì classic', price: '640.000₫', image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?auto=format&fit=crop&w=900&q=85', tag: '' },
  { category: 'Chân váy', name: 'Chân váy tweed viền tua', price: '850.000₫', image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=900&q=85', tag: 'Mới' },
  { category: 'Chân váy', name: 'Chân váy satin bất đối xứng', price: '760.000₫', image: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?auto=format&fit=crop&w=900&q=85', tag: '' },
  { category: 'Chân váy', name: 'Chân váy denim dáng dài', price: '695.000₫', image: 'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=900&q=85', tag: 'Bán chạy' },
  { category: 'Chân váy', name: 'Chân váy wrap nhẹ nhàng', price: '675.000₫', image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85', tag: '' },
  { category: 'Đầm', name: 'Váy midi dáng suông', price: '895.000₫', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85', tag: 'Bán chạy' },
  { category: 'Đầm', name: 'Đầm cổ vuông tay phồng', price: '990.000₫', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85', tag: 'Mới' },
  { category: 'Đầm', name: 'Đầm lụa lệch vai', price: '1.150.000₫', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85', tag: '' },
  { category: 'Đầm', name: 'Đầm maxi thắt eo', price: '1.090.000₫', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85', tag: '' },
  { category: 'Đầm', name: 'Đầm hoa nhí cổ V', price: '935.000₫', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85', tag: 'Mới' },
  { category: 'Đầm', name: 'Đầm knit ôm dáng', price: '860.000₫', image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=900&q=85', tag: '' },
  { category: 'Đầm', name: 'Đầm sơ mi belted', price: '1.020.000₫', image: 'https://images.unsplash.com/photo-1566479179817-c0bf0d1d7bb0?auto=format&fit=crop&w=900&q=85', tag: 'Bán chạy' },
  { category: 'Đầm', name: 'Đầm cocktail đen', price: '1.290.000₫', image: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=900&q=85', tag: '' },
]

// Bọc các ký tự icon để không bị đọc bởi trình đọc màn hình.
function Icon({ children }: { children: ReactNode }) {
  return <span className="icon" aria-hidden="true">{children}</span>
}

function App() {
  // State điều khiển menu mobile, ô tìm kiếm và danh mục đang được chọn.
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Áo')

  // Chỉ lấy các sản phẩm thuộc danh mục người dùng đang xem.
  const selectedProducts = products.filter(
    (product) => product.category === activeCategory,
  )

  function selectCategory(categoryId: string) {
    setActiveCategory(categoryId)
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="storefront">
      {/* Thanh thông báo phía trên cùng */}
      <div className="announcement">
        ĐỔI HÀNG TRONG 45 NGÀY <span /> FREESHIP CHO ĐƠN TỪ 700.000₫
      </div>

      {/* Header gồm logo, điều hướng và các nút thao tác */}
      <header className="site-header">
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Mở menu">
          <Icon>☰</Icon>
        </button>
        <a className="brand" href="#top" aria-label="Mono Studio trang chủ">MONO<span>STUDIO</span></a>
        <nav className={menuOpen ? 'navigation open' : 'navigation'}>
          <a href="#top">TRANG CHỦ</a>
          <a href="#products">SẢN PHẨM <small>⌄</small></a>
          <a href="#collection">BỘ SƯU TẬP MỚI</a>
          <a href="#about">VỀ CHÚNG TÔI</a>
        </nav>
        <div className="header-actions">
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Tìm kiếm"><Icon>⌕</Icon></button>
          <button aria-label="Tài khoản"><Icon>♙</Icon></button>
          <button className="bag" aria-label="Giỏ hàng"><Icon>▢</Icon><b>0</b></button>
        </div>
      </header>

      {/* Ô tìm kiếm chỉ xuất hiện khi nhấn nút tìm kiếm */}
      {searchOpen && <div className="search-panel"><input autoFocus placeholder="Tìm kiếm sản phẩm..." /><button onClick={() => setSearchOpen(false)}>Đóng</button></div>}

      <main id="top">
        {/* Ảnh lớn và lời giới thiệu bộ sưu tập */}
        <section className="hero"><div className="hero-copy"><p className="eyebrow">PRE-FALL COLLECTION ’26</p><h1>Chạm vào<br />sự thanh lịch</h1><p>Những thiết kế mới dành cho nhịp sống hiện đại, nhẹ nhàng và đầy tự tin.</p><a className="button" href="#products">KHÁM PHÁ NGAY <span>→</span></a></div></section>

        {/* Các danh mục. Bấm vào thẻ sẽ lọc sản phẩm bên dưới. */}
        <section className="category-section" aria-label="Danh mục sản phẩm"><div className="category-title"><p className="eyebrow">SHOP BY CATEGORY</p><p>Chọn một nhóm sản phẩm để khám phá những thiết kế dành riêng cho bạn.</p></div><div className="categories">{categories.map((category) => <button className={activeCategory === category.id ? 'category-card active' : 'category-card'} key={category.id} onClick={() => selectCategory(category.id)}><img src={category.image} alt="" /><span className="category-number">{category.index}</span><div><strong>{category.id}</strong><small>{category.description}</small></div><i>↗</i></button>)}</div></section>

        <section className="intro" id="about"><p className="eyebrow">THE MODERN ESSENCE</p><h2>Mặc theo cách<br />của riêng bạn.</h2><p>Mono Studio tôn vinh vẻ đẹp tự nhiên bằng những phom dáng tối giản, chỉn chu trong từng chi tiết.</p><a href="#products" className="text-link">CÂU CHUYỆN CỦA CHÚNG TÔI <span>→</span></a></section>

        {/* Lưới sản phẩm được cập nhật mỗi khi activeCategory thay đổi. */}
        <section className="product-section" id="products"><div className="section-heading"><div><p className="eyebrow">{activeCategory.toUpperCase()} / {selectedProducts.length} SẢN PHẨM</p><h2>{activeCategory} chọn lọc</h2></div><a href="#products">XEM TẤT CẢ <span>→</span></a></div><div className="product-grid">{selectedProducts.map((product) => <article className="product" key={product.name}><a className="product-image" href="#products"><img src={product.image} alt={product.name} />{product.tag && <span>{product.tag}</span>}<button aria-label={`Thêm ${product.name} vào giỏ`}>+</button></a><div className="product-info"><h3>{product.name}</h3><p>{product.price}</p></div></article>)}</div></section>

        <section className="editorial" id="collection"><div className="editorial-photo" /><div className="editorial-copy"><p className="eyebrow">THE EDIT</p><h2>Nhẹ nhàng<br />đón mùa mới</h2><p>Chất liệu mềm mại cùng những gam màu trung tính làm nên tủ đồ vượt thời gian.</p><a className="button button-light" href="#products">XEM BỘ SƯU TẬP <span>→</span></a></div></section>
      </main>

      <footer><a className="brand" href="#top">MONO<span>STUDIO</span></a><p>Designed for everyday confidence.</p><div><a href="#top">Instagram</a><a href="#top">Facebook</a><a href="#top">Liên hệ</a></div><small>© 2026 MONO STUDIO. ALL RIGHTS RESERVED.</small></footer>
    </div>
  )
}

export default App
