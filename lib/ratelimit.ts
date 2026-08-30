import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Hanya inisialisasi jika environment variables tersedia (menghindari crash jika belum di-set)
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken 
  ? new Redis({ url: redisUrl, token: redisToken }) 
  : null;

// Buat instance ratelimiter baru
// Mengizinkan 5 request per 60 detik (1 menit) per identifier
export const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(5, "60 s"),
      analytics: true,
      // prefix opsional untuk membedakan namespace di Redis jika dipakai banyak project
      prefix: "@upstash/ratelimit/lolos-pcpm",
    })
  : null;
