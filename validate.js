// set transportationCosts
var innerCity = 0;
var suburbanArea = 30000;

const book = document.getElementById('sach');
const publish = document.getElementById('nxb');
const quantity = document.getElementById('soluong');
const unitPrice = document.getElementById('dongia');
const totalAmount = document.getElementById('tongtien');
const publishDate = document.getElementById('ngaythang');
const kindOfBook = document.getElementById('quequan');
const importer = document.getElementById('nguoinhap');
const PACheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
// const MultiPAValue = PARadios.length>0? radios[0].value: null;
const deliverAreaRadio = document.querySelectorAll('input[name="area"]');
const transportationCosts = document.getElementById('phivanchuyen');
const clearBtn = document.getElementById('btn-clear');
const submitBtn = document.getElementById('btn-submit');


book.addEventListener('blur', validateBook);
publish.addEventListener('blur', validatePublish);
quantity.addEventListener('blur', validateQuantity);
unitPrice.addEventListener('blur', validateUnitPrice);
// event change
quantity.addEventListener('change', countTotalAmount);
unitPrice.addEventListener('change', countTotalAmount);
publishDate.addEventListener('blur', validatePublishDate);
// kindOfBook.addEventListener('blur', validateKindOfBook);
importer.addEventListener('blur', validateImporter);
// PACheckbox.addEventListener('blur', validatePACheckbox);
// deliverAreaRadio.addEventListener('change', validateDeliverAreaRadio);
clearBtn.addEventListener('click', cleanForm);
submitBtn.addEventListener('click', showData);

if (deliverAreaRadio) {
  deliverAreaRadio.forEach((elem) => {
    elem.addEventListener("change", validateDeliverAreaRadio)
  });
}

function showData(e) {
	let data = getDataForm()
	if (data.length > 1) {
		alert(data)
	}
	e.preventDefault();
}

function cleanForm(){
    document.getElementById("myForm").reset()
}

function getDataForm() {
	let info = '';
	let validators = [
		validateBook, validatePublishDate, validateQuantity,
		validateUnitPrice, validatePublish,
		validateImporter, validateKindOfBook, validateTransportationCosts
	];
	let result = validators.every(function (validator) {
		return validator()
	})
	if (result) {
		let area = document.querySelector('input[name="area"]:checked');
         info = `
        Thong Tin Sach
        ==============================
        Ten sach: ${book.value}
        Nha xuat ban: ${publish.value}
        So luong: ${quantity.value}
        Don gia: ${unitPrice.value} VND
        Tong tien: ${totalAmount.value} VND
        Ngay/Thang/Nam xuat ban: ${publishDate.value}
        Loai sach: ${kindOfBook.value}
        Nguoi nhap: ${importer.value}
        San pham dang co:
        Noi nhan hang: ${area.value}
        Phi van chuyen: ${transportationCosts.value} VND
        ==============================
        `

	}
	return info;
}

function validateBook(){
    if(isEmpty(book.value)){
        setErrorFor(book, "Tên sách không để trống");
        return false;
    }
    else{
        setSuccessFor(book)
        return true;

    }
}

function validatePublish(e) {
	if (isEmpty(publish.value)) {
		setErrorFor(publish, "Nhà xuất bản không để trống")
		return false
	} else {
		setSuccessFor(publish)
		return true
	}

}

function validateQuantity(){
    const re = /\d+/g
    if(isEmpty(quantity.value)) {
        setErrorFor(quantity, 'Số lượng không để trống');
        return false;
	} else if(!re.test(quantity.value)) {
        setErrorFor(quantity, 'Số lượng theo dạng số nguyên dương');
        return false;
	} else{
        setSuccessFor(quantity);
        return true;
	}
}

function validateUnitPrice(){
	const re = /\d+/g
    if(isEmpty(unitPrice.value)){
        setErrorFor(unitPrice, 'Đơn giá không để trống');
        return false;
    } else if(!re.test(unitPrice.value)) {
		setErrorFor(unitPrice, 'Đơn giá theo dạng số nguyên dương');
		return false;
	}
    else{
        setSuccessFor(unitPrice);
        return true;
    }

}

function countTotalAmount(event){
	let total = parseInt(quantity.value) * parseInt(unitPrice.value);
	if (!Number.isNaN(total)){
		totalAmount.value = String(total);
	} else {
		totalAmount.value = '';
	}

}


function validatePublishDate(){
    const re = /^\d{1,2}[\/]\d{1,2}[\/]\d{4}$/g;
    if (isEmpty(publishDate.value)){
		setErrorFor(publishDate, 'Ngày tháng xuất bản không được để trống.');
		return false;
	}
    if(!re.test(publishDate.value)){
        setErrorFor(publishDate, 'Ngày tháng xuất bản không đúng định dạng dd/mm/yyyy');
        return false;
    }else{
        setSuccessFor(publishDate);
        return true;

    }
}

function validateKindOfBook(e) {
	if (isEmpty(kindOfBook.value)) {
		setErrorFor(kindOfBook, "Hãy chọn thể loại sách")
		return false
	}else {
		setSuccessFor(kindOfBook)
		return true
	}
}

function validateImporter(e) {
	const re = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]{2,}$/igm;
    if (isEmpty(importer.value)){
		setErrorFor(importer, "Tên người nhập không để trống")
		return false
	}else if (!re.test(importer.value)) {
		setErrorFor(importer, "Tên người nhập chỉ gồm chữ a-z, A-Z và khoảng ")
		return false
	} else {
		setSuccessFor(importer)
		return true
	}
}

function validatePACheckbox(e) {
    console.log("Run validate Checkbox")
}

function validateDeliverAreaRadio(e) {
	let choice = e.target.value;
	if (choice === "ngoaithanh"){
		setTransportationCosts(suburbanArea);
	} else if (choice === "noithanh"){
		setTransportationCosts(innerCity);
	}

}

function setTransportationCosts(number) {
		transportationCosts.value = String(number);
}

function validateTransportationCosts() {
    if (isEmpty(transportationCosts.value)){
    	setErrorFor(transportationCosts, "Chọn Phí vận chuyển nội thành hoặc ngoại thành")
		return false
	} else{
    	setSuccessFor(transportationCosts)
		return true
	}
}
function isEmpty(str) {
    return !str.trim().length;
}

function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}