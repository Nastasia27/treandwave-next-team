'use client';
import { useState } from "react";
import { addProduct } from "../actions/newProduct";
import NotificationModal from "../notificationModal";
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { ChevronDown, Trash2 } from 'lucide-react';

const initialState = {
    message: '',
  };

function SubmitButton() {
    const { pending, error } = useFormStatus();

    return (
        <button 
            type="submit" 
            className="bg-[#336CFF] p-2 rounded text-white uppercase">
            {pending ? 'Додавання...' : 'Додати'}
        </button>
    );
}

export function AddProductForm({ colorsList, tags, models, categories, sizes, collection }) {
    const [selectedCategories, setSelectedCategories] = useState(categories[0].name);
    const [selectedTags, setSelectedTags] = useState([]);
    const [additionalFields, setAdditionalFields] = useState([{ colorName: '', altText: '', images: [], sizes: [{size:'', quantity: ''}] },]);
    const [additionalSizeFields, setAdditionalSizeFields] = useState([{size:'', quantity: ''}]);
    const [state, formAction] = useFormState(addProduct, initialState);
    const [selectedColorButton, setSelectedCalorButton] = useState(null);
    const [selectedAdditionalColorButton, setSelectedAdditionalCalorButton] = useState(null);
    const [selectedMainColor, setSelectedMainColor] = useState('');

    const handleSelected = (e) => {   
        const selectedCategory = e.target.value;
        setSelectedCategories(selectedCategory);
    }

    const handleSelectedMainColor = (e) => {
        const mainColor = e;
        setSelectedMainColor(mainColor);
        setSelectedCalorButton(false);
    }

    const handleSelectedAdditionalColor = (index, colorName) => {
        setAdditionalFields((prev) => 
            prev.map((field, i) => 
                i === index ? {...field, colorName} : field
            ));
        setSelectedAdditionalCalorButton(false);
    }

    const handleRemoveAdditionalColor = (index) => {
        console.log('index', index);
        setAdditionalFields((prev) => {
            const updateFields = [...prev];
            updateFields.splice(index, 1 );
            return updateFields;
        });
    }

    const handleTagChange = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag)); // Убираем тег
        } else {
            setSelectedTags([...selectedTags, tag]); // Добавляем тег
        }
    };

    const addField = () => {
        setAdditionalFields([
            ...additionalFields,
            { colorName: '', altText: '', images: null, sizes: [{size:'', quantity: ''}] },
        ]);
    };

    const addSizeField = () => {
        setAdditionalSizeFields([
            ...additionalSizeFields,
            { size:'', quantity: '' },
        ]);
    };


  return (
    <div className="w-full flex-col relative">
        <form action={formAction} className="flex w-full flex-col gap-10">

            {/* input for color of Main Image */}
            <input type="hidden" name="mainColor" value={selectedMainColor || ''} />

            {/* block for name, description and price of the product */}
            <div className="border border-[#0047FF] mob:border-0 rounded p-5 mob:p-0 flex w-full flex-col gap-2">
                <label htmlFor="title">Назва товару</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className="focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]"
                />
                <label htmlFor="description">Опис товару</label>
                <textarea
                    type="text"
                    id="description"
                    name="description"
                    required
                    className="focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]"
                />
                <div className="grid grid-cols-2 mob:grid-cols-1 gap-2">
                    <div>
                        <label htmlFor="price">Ціна</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            required
                            className="focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]"
                        />
                    </div>
                    <div>
                        <label htmlFor="discountPercentage">Знижка,%</label>
                        <input
                            type="number"
                            id="discountPercentage"
                            name="discountPercentage"
                            className="focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]"
                        />
                    </div>
                </div>
                <div className="flex gap-2 mob:flex-col">
                    <div>
                        <label htmlFor="article">Артикул</label>
                        <input
                            type="text"
                            id="article"
                            name="article"
                            required
                            className="focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]"
                        />
                    </div>
                    <div>
                        <label htmlFor="isNew">Новинка</label>
                        <select 
                            name="isNew"
                            id="isNew" 
                            className="focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]"
                        >
                            <option value={true}>Новий</option>
                            <option value={false}>Ні</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-2 mob:flex-col">
                <div>
                    <label htmlFor="category">Категорія</label>
                    <select
                        name="category"
                        id="category"
                        className="capitalize focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]"
                        onChange={(e) => handleSelected(e)}
                    >
                        {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="subCategory">Підкатегорія</label>
                    <select
                        name="subCategory"
                        id="subCategory"
                        className="capitalize focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]"
                    >
                        {categories
                        .find((category) => category.name === selectedCategories)
                        ?.subCategories.map((subCategory) => (
                            <option key={subCategory.id} value={subCategory.name}>
                                {subCategory.name}
                            </option>
                        ))}
                    </select>
                </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <label htmlFor="model">Модель</label>
                        <select name="model" 
                            className="capitalize focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]"
                            >
                            {models.map((model) => (
                                <option 
                                    key={model.id} 
                                    value={model.name}
                                    >
                                        {model.name} 
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="model">Колекція</label>
                        <select name="collection" 
                            className="capitalize focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]"
                            >
                            {collection.map((collItem) => (
                                <option 
                                    key={collItem.id} 
                                    value={collItem.name}
                                    >
                                        {collItem.name} 
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="">
                        <label htmlFor="tags">Теги</label>
                        <div id="tags" name="tags" className="flex flex-wrap gap-5">
                            {tags.map((tag) => (
                                <label key={tag.id} className="flex items-center space-x-2">
                                    <input
                                        name="tags"
                                        type="checkbox"
                                        value={tag.name}
                                        checked={selectedTags.includes(tag.name)}
                                        onChange={() => handleTagChange(tag.name)}
                                        className="w-4 h-4 accent-blue-500"
                                    />
                                    <span className="capitalize">{tag.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* block for all images uplouding  */}
            <div className="border border-[#0047FF] mob:border-0 rounded p-5 mob:p-0 flex flex-col gap-2">
                {additionalFields.map((field, index) => (
                    <div key={index} className="flex flex-col gap-5 py-5 border-t">
                        <div className="flex justify-between">
                            <h3>Фото товару {additionalFields[index].colorName}</h3>
                            <button type="button" onClick={() => handleRemoveAdditionalColor(index)}> <Trash2 color="red"/> </button>
                        </div>
                        
                        <input type="hidden" name={`colorName_${index}`} value={additionalFields[index].colorName}/>
                        <div className="flex  relative">
                            <button 
                                onClick={() => setSelectedAdditionalCalorButton(index)} 
                                type="button"
                                className="capitalize flex justify-between focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]"
                                >
                                    { field.colorName ? field.colorName : 'Оберіть колір' }
                                    <ChevronDown/>
                            </button>
                            {selectedAdditionalColorButton === index && 
                                <div className="w-full absolute right-0 z-10 h-96 overflow-scroll bg-white origin-top-right p-5 flex flex-col gap-2" aria-orientation="vertical" role="menu" aria-labelledby="menu-button" tabIndex="-1">
                                    {colorsList.map((color) => (
                                        <div 
                                            key={color.id} 
                                            className="p-1 uppercase flex gap-5 items-center"
                                            role="menuitem"
                                            onClick={() => handleSelectedAdditionalColor(index, color.colorName)}
                                            >
                                                <div style={{backgroundColor: color.hex}}
                                                    className="w-6 h-6"
                                                ></div>
                                                {color.colorName} 
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>

                        <input
                            type="file"
                            name={`images_${index}`}
                            multiple
                        />
                    
                        <div className="flex flex-col gap-2">
                            {additionalSizeFields.map((field, subindex) => (
                                <div key={subindex} className="flex mob:flex-col gap-2">
                                    <select
                                        name={`sizes_${index}_${subindex}`}
                                        className="capitalize focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]"
                                        
                                    >
                                        <option value="">Оберіть розмір</option>
                                        {sizes.map((size) => (
                                            <option key={size.id} value={size.size}>
                                                {size.size}
                                            </option>
                                        ))}
                                    </select>
                                    <input 
                                        type="number"
                                        min={0}
                                        name={`quantity`}
                                        placeholder="кількість"
                                        className="focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]" 
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addSizeField}
                                className="bg-[#0047FF] text-white p-2 rounded uppercase"
                            >
                                Додати поле з розміром
                            </button>
                        </div>
                        
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addField}
                    className="bg-[#0047FF] mt-5 text-white p-2 rounded uppercase"
                >
                    Додати поле з іншим кольором
                </button>
            </div>

            {/* block for main image uploading */}
            <div className="border border-[#0047FF] rounded p-5 flex flex-col gap-2">
                <h3>Головна картинка</h3>
                <div className="flex  relative">
                    <button 
                        onClick={() => setSelectedCalorButton(true)} 
                        type="button"
                        className="capitalize flex justify-between focus:outline-none bg-white ring-0 ring-offset-0 p-3 rounded w-full border-[#BABABA] border-[1px] hover:ring-[#336CFF] hover:border-[#336CFF] focus:ring-[#336CFF] focus:border-[#336CFF]"
                        >
                            { selectedMainColor ? selectedMainColor : 'Оберіть колір' }
                            <ChevronDown/>
                    </button>
                    {selectedColorButton && 
                        <div className="w-full absolute right-0 z-10 h-96 overflow-scroll bg-white origin-top-right p-5 flex flex-col gap-2" aria-orientation="vertical" role="menu" aria-labelledby="menu-button" tabIndex="-1">
                            {colorsList.map((color) => (
                                <div 
                                    key={color.id} 
                                    className="p-1 uppercase flex gap-5 items-center"
                                    role="menuitem"
                                    onClick={() => handleSelectedMainColor(color.colorName)}
                                    >
                                        <div style={{backgroundColor: color.hex}}
                                            className="w-6 h-6"
                                        ></div>
                                        {color.colorName} 
                                </div>
                            ))}
                        </div>
                    }
                </div>
                <input type="file" name="image" required />
            </div>       
        <SubmitButton />
        </form>

        <div className="w-full h-auto relative">
          <NotificationModal message={state?.message}/>
        </div>
    </div>
  );
}