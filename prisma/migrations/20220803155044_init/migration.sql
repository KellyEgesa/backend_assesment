-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" VARCHAR(255) NOT NULL,
    "content" VARCHAR(500),

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TotalCount" (
    "id" INTEGER NOT NULL,
    "commentCount" INTEGER NOT NULL,

    CONSTRAINT "TotalCount_pkey" PRIMARY KEY ("id")
);
