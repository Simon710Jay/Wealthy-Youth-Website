"use client";

import { useState, useRef } from 'react';
import { Button } from '@/app/components/ui/button';
import { Plus, X, UploadCloud, Edit, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { createProduct, updateProduct, deleteProduct } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function AdminProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const router = useRouter();

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [discountPrice, setDiscountPrice] = useState<number | ''>('');
  const [stockQuantity, setStockQuantity] = useState<number>(0);
  const [sku, setSku] = useState('');
  const [sizes, setSizes] = useState('');
  const [colors, setColors] = useState('');
  const [status, setStatus] = useState('Draft');
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);

  // File Upload State
  const [existingImages, setExistingImages] = useState<any[]>([]); // { url, publicId }
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviewUrls, setNewPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['clothing', 't-shirts', 'polo shirts', 'hoodies', 'caps', 'wristbands', 'bags', 'books', 'accessories', 'other'];

  const openModal = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      setName(product.name || '');
      setSlug(product.slug || '');
      setDescription(product.description || '');
      setCategory(product.category || 'clothing');
      setPrice(product.price || '');
      setDiscountPrice(product.discountPrice || '');
      setStockQuantity(product.stockQuantity || 0);
      setSku(product.sku || '');
      setSizes(product.sizes?.join(', ') || '');
      setColors(product.colors?.join(', ') || '');
      setStatus(product.status || 'Draft');
      setFeatured(product.featured || false);
      setPublished(product.published || false);
      setExistingImages(product.images || []);
      setNewFiles([]);
      setNewPreviewUrls([]);
    } else {
      setEditingProduct(null);
      setName('');
      setSlug('');
      setDescription('');
      setCategory('clothing');
      setPrice('');
      setDiscountPrice('');
      setStockQuantity(0);
      setSku('');
      setSizes('');
      setColors('');
      setStatus('Draft');
      setFeatured(false);
      setPublished(false);
      setExistingImages([]);
      setNewFiles([]);
      setNewPreviewUrls([]);
    }
    setIsModalOpen(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!editingProduct) {
      setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files);
      setNewFiles([...newFiles, ...filesArray]);
      const newUrls = filesArray.map(f => URL.createObjectURL(f));
      setNewPreviewUrls([...newPreviewUrls, ...newUrls]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewFiles([...newFiles, ...filesArray]);
      const newUrls = filesArray.map(f => URL.createObjectURL(f));
      setNewPreviewUrls([...newPreviewUrls, ...newUrls]);
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const removeNewFile = (index: number) => {
    setNewFiles(newFiles.filter((_, i) => i !== index));
    setNewPreviewUrls(newPreviewUrls.filter((_, i) => i !== index));
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImages = [...existingImages];

      // Upload new files
      for (const file of newFiles) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'wealthy_youth/shop');
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        
        if (uploadData.secure_url) {
          finalImages.push({
            url: uploadData.secure_url,
            publicId: uploadData.public_id
          });
        } else {
          throw new Error(uploadData.error || 'Image upload failed');
        }
      }

      const productData = {
        name,
        slug,
        description,
        category,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        stockQuantity: Number(stockQuantity),
        sku,
        sizes: sizes ? sizes.split(',').map(s => s.trim()).filter(s => s) : [],
        colors: colors ? colors.split(',').map(c => c.trim()).filter(c => c) : [],
        status,
        featured,
        published,
        images: finalImages
      };

      if (editingProduct) {
        const updated = await updateProduct(editingProduct._id, productData);
        setProducts(products.map((p: any) => p._id === updated._id ? updated : p));
      } else {
        const newProduct = await createProduct(productData);
        setProducts([newProduct, ...products]);
      }
      
      setIsModalOpen(false);
      router.refresh();
    } catch (error: any) {
      console.error('Failed to save product:', error);
      alert(`Failed to save product: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p: any) => p._id !== id));
      setDeleteConfirm(null);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
    }
  };

  const togglePublish = async (product: any) => {
    try {
      const updated = await updateProduct(product._id, { published: !product.published });
      setProducts(products.map((p: any) => p._id === updated._id ? updated : p));
      router.refresh();
    } catch (error) {
      console.error('Failed to update publish status:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Shop Products</h1>
          <p className="text-muted-foreground">Manage your store inventory, pricing, and details.</p>
        </div>
        <Button 
          onClick={() => openModal()}
          className="rounded-full bg-primary hover:bg-[#111111] text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> New Product
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-border-gray shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#FAFAFA] border-b border-border-gray text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-bold">Image</th>
              <th className="px-6 py-4 font-bold">Product Name</th>
              <th className="px-6 py-4 font-bold">Category</th>
              <th className="px-6 py-4 font-bold">Price</th>
              <th className="px-6 py-4 font-bold">Stock</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray text-sm">
            {products.map((product: any) => (
              <tr key={product._id} className="hover:bg-black/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    {product.images && product.images.length > 0 ? (
                       <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                       <span className="text-xs text-muted-foreground">No img</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-black">{product.name}</td>
                <td className="px-6 py-4 text-muted-foreground capitalize">{product.category}</td>
                <td className="px-6 py-4 font-bold">₦{product.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.stockQuantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.stockQuantity} in stock
                  </span>
                </td>
                <td className="px-6 py-4 flex flex-col gap-1 items-start">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    product.status === 'Out of Stock' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status}
                  </span>
                  {product.published ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Published</span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Unpublished</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => togglePublish(product)} title={product.published ? "Unpublish" : "Publish"}>
                      {product.published ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openModal(product)}>
                      <Edit className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm(product._id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                  No products found. Start by creating one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="text-muted-foreground mb-6">Are you sure you want to permanently delete this product? All images will also be deleted from storage.</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="rounded-full">Cancel</Button>
              <Button onClick={() => handleDelete(deleteConfirm)} className="rounded-full bg-red-600 hover:bg-red-700 text-white">Delete</Button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 py-12">
          <div className="bg-white rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-4 border-b border-border-gray">
              <h2 className="text-2xl font-bold">{editingProduct ? 'Edit Product' : 'Create New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-black">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveProduct} className="space-y-8">
              
              {/* IMAGE UPLOAD DRAG & DROP */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-black">Product Images</label>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  {/* Existing Images */}
                  {existingImages.map((img, idx) => (
                    <div key={idx} className="relative w-32 h-32 rounded-xl overflow-hidden border border-border-gray group">
                      <img src={img.url} alt="Product" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeExistingImage(idx)} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {/* New Files Preview */}
                  {newPreviewUrls.map((url, idx) => (
                    <div key={idx} className="relative w-32 h-32 rounded-xl overflow-hidden border border-border-gray group">
                      <img src={url} alt="New Upload Preview" className="w-full h-full object-cover opacity-70" />
                      <button type="button" onClick={() => removeNewFile(idx)} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer border-border-gray hover:border-primary bg-[#FAFAFA]`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/webp" />
                  
                  <div className="flex flex-col items-center justify-center py-4">
                    <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
                    <p className="font-bold text-black mb-1">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">Support multiple JPG, PNG, WEBP images</p>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Product Name *</label>
                  <input required value={name} onChange={handleNameChange} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="e.g. Premium T-Shirt" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">URL Slug *</label>
                  <input required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="e.g. premium-t-shirt" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Category *</label>
                  <select required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors capitalize">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">SKU</label>
                  <input value={sku} onChange={(e) => setSku(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="e.g. TSHIRT-001" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Price (NGN) *</label>
                  <input required type="number" step="1" min="0" value={price} onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="0" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Discount Price (NGN)</label>
                  <input type="number" step="1" min="0" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value ? Number(e.target.value) : '')} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="0 (Optional)" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Stock Quantity *</label>
                  <input required type="number" min="0" value={stockQuantity} onChange={(e) => setStockQuantity(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Product Status</label>
                  <select required value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors">
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-black">Product Description *</label>
                <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="Detailed description of the product..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Sizes (comma separated)</label>
                  <input value={sizes} onChange={(e) => setSizes(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="e.g. S, M, L, XL" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Colors (comma separated)</label>
                  <input value={colors} onChange={(e) => setColors(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="e.g. Red, Blue, Black" />
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 bg-[#FAFAFA] rounded-xl border border-border-gray">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-5 h-5 rounded border-border-gray text-primary focus:ring-primary" />
                  <span className="text-sm font-bold text-black">Featured Product</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-5 h-5 rounded border-border-gray text-primary focus:ring-primary" />
                  <span className="text-sm font-bold text-black">Published to Shop</span>
                </label>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-border-gray">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-full px-8">Cancel</Button>
                <Button type="submit" disabled={isSubmitting} className="rounded-full bg-primary hover:bg-[#111111] text-white px-8">
                  {isSubmitting ? 'Saving...' : (editingProduct ? 'Save Changes' : 'Create Product')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
