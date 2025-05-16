// Import Firebase services
import { auth } from "./firebaseconfig"; // Adjust the path as necessary
import { db } from "./firebaseconfig";  // Adjust the path as necessary
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, setDoc, collection, addDoc, getDocs, getDoc, query, where, updateDoc } from "firebase/firestore"; // Import Firestore methods
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseconfig"; // Adjust the path as necessary


// Register function
export const registerUser = async (email, password, fullName, phoneNumber) => {
  try {
    // Create a new user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user data in Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      fullName: fullName,
      phoneNumber: phoneNumber,
      createdAt: new Date().toISOString()
    });

    console.log("User registered: ", user);
    console.log("User data stored in Firestore");
  } catch (error) {
    console.error("Error registering user: ", error);
    throw new Error(error.message);
  }
};

// Add Category
export const addCategory = async (name, description, imageFile) => {
  try {
    let imageUrl = "";

    // 1. Upload image to Firebase Storage (if available)
    if (imageFile) {
      const storageRef = ref(storage, `categories/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    // 2. Generate a new document reference with ID
    const docRef = doc(collection(db, "categories"));
    const categoryId = docRef.id;

    // 3. Set the document with the ID
    await setDoc(docRef, {
      id: categoryId,
      name,
      description,
      image: imageUrl,
      productsCount: 0,
      createdAt: new Date().toISOString(),
    });

    console.log("Category added with ID:", categoryId);
    return categoryId;
  } catch (error) {
    console.error("Error adding category:", error);
    throw new Error("Failed to add category");
  }
};

export const fetchCategories = async () => {
  try {
    const categoriesCol = collection(db, "categories");
    const categorySnapshot = await getDocs(categoriesCol);

    // Fetch categories and count the products for each category
    const categories = [];

    for (const categoryDoc of categorySnapshot.docs) {
      const categoryData = categoryDoc.data();
      const categoryId = categoryDoc.id;

      // Query the products collection to find products with this categoryId
      const productsCol = collection(db, "products");
      const productsQuery = query(productsCol, where("categoryId", "==", categoryId));  // Filter products by categoryId
      const productSnapshot = await getDocs(productsQuery);

      // Count how many products belong to this category
      const productCount = productSnapshot.size;  // The size of the snapshot gives the count

      // Add the product count to the category data
      categories.push({
        id: categoryId,
        ...categoryData,
        productCount,  // Add the product count for the category
      });
    }

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};



export const fetchProductsByCategory = async (categoryId) => {
  try {
    const q = query(
      collection(db, 'products'),
      where('categoryId', '==', categoryId)
    );
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

// Fetch Product by ID

export const fetchCategoryById = async (id) => {
  const ref = doc(db, "categories", id);
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  } else {
    return { name: "Unknown Category" };
  }
};

export const editCategory = async (categoryId, updatedData, imageFile = null) => {
  try {
    let imageUrl = updatedData.image || "";

    if (imageFile) {
      const storageRef = ref(storage, `categories/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    const updatedFields = {
      ...updatedData,
      ...(imageUrl && { image: imageUrl }), // replaces image only if new image is provided
      updatedAt: new Date().toISOString(),
    };

    const categoryRef = doc(db, "categories", categoryId);
    await updateDoc(categoryRef, updatedFields);

    console.log("Category updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Failed to update category");
  }
};



// Add Product
export const addProduct = async ({ name, categoryId, price, stock, description, imageFile }) => {
  try {
    let imageUrl = "";

    // 1. Upload image to Firebase Storage if provided
    if (imageFile) {
      const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    // 2. Add product document to Firestore
    const docRef = await addDoc(collection(db, "products"), {
      name,
      categoryId, // Use categoryId instead of category name
      price: parseFloat(price),
      stock,
      description,
      image: imageUrl,
      createdAt: new Date().toISOString(),
    });

    // After the product document is created, update it with its own ID
    const productWithId = {
      id: docRef.id, // Add the product ID here
      name,
      categoryId, // Store the categoryId for fetching products later
      price: parseFloat(price),
      stock,
      description,
      image: imageUrl,
      createdAt: new Date().toISOString(),
    };

    // Update the product document with its own ID field
    await setDoc(doc(db, "products", docRef.id), productWithId);

    console.log("Product added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }
};
// Fetch Products
export const fetchProducts = async () => {
  try {
    const productsCol = collection(db, "products");
    const productSnapshot = await getDocs(productsCol);

    const products = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()  // Include all the fields like image, name, price, etc.
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductCount = async () => {
  try {
    const productsCol = collection(db, "products");
    const productSnapshot = await getDocs(productsCol);
    return productSnapshot.size; // Returns the count of products
  } catch (error) {
    console.error("Error fetching products count:", error);
    throw new Error("Failed to fetch product count");
  }
};

export const addToCart = async (userId, product, quantity = 1) => {
  try {
    const cartRef = collection(db, "cart");

    // Check if this product is already in the user's cart
    const q = query(
      cartRef,
      where("userId", "==", userId),
      where("productId", "==", product.id)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // Product already in cart — update quantity
      const existingDoc = snapshot.docs[0];
      const currentQuantity = existingDoc.data().quantity || 1;
      await updateDoc(doc(db, "cart", existingDoc.id), {
        quantity: currentQuantity + quantity,
        updatedAt: new Date().toISOString()
      });
    } else {
      // Product not in cart — add new
      await addDoc(cartRef, {
        userId,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        createdAt: new Date().toISOString()
      });
    }

    console.log("Added to cart");
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
};

export const fetchCartByUser = async (userId) => {
  try {
    const q = query(collection(db, "cart"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
    return [];
  }
};

// Correct version to be used inside components
export const updateCartQuantity = async (cartItemId, newQuantity) => {
  try {
    const cartItemRef = doc(db, "cart", cartItemId);
    await updateDoc(cartItemRef, {
      quantity: newQuantity,
      updatedAt: new Date().toISOString(),
    });
    console.log("Quantity updated in Firestore");
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw error;
  }
};

export const deleteCartItem = async (cartItemId) => {
  try {
    const ref = doc(db, "cart", cartItemId);
    await deleteDoc(ref);
    console.log("Cart item deleted successfully.");
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error;
  }
};

// Login function
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;  // Return user information
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error;  // Throw error to handle it in the component
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await signOut(auth);  // Sign the user out
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out: ", error);
    throw error;  // Throw error to handle it in the component
  }
};