from silence.decorators import endpoint

@endpoint(
    route="/ratings",
    method="GET",
    sql="SELECT * FROM Ratings"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/ratings/$photoId",
    method="GET",
    sql="SELECT * FROM Ratings inner join users on (users.userId = ratings.userId) WHERE photoId = $photoId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/ratings",
    method="POST",
    sql="INSERT INTO Ratings (userId, photoId, punctuation, date) VALUES ($userId, $photoId, $punctuation, $date)",
    description="Creates a new rating",
    auth_required=True,
)
def create(userId, photoId, punctuation, date):
    pass

###############################################################################