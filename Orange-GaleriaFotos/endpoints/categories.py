from silence.decorators import endpoint

@endpoint(
    route="/categories",
    method="GET",
    sql="SELECT * FROM Categories"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/categories/$nameCategory",
    method="GET",
    sql="SELECT * FROM Photos WHERE category = $nameCategory AND photos.visibility='Pública'"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/categories",
    method="POST",
    sql="INSERT INTO Categories (nameCategory) VALUES ($nameCategory)",
    description="Create a new category",
    auth_required=True,
)
def create(nameCategory):
    pass

###############################################################################

@endpoint(
    route="/categories/$categoryId",
    method="DELETE",
    sql="DELETE FROM Categories WHERE categoryId = $categoryId",
    description="Removes a category",
    auth_required=True,
)
def delete():
    pass

###############################################################################