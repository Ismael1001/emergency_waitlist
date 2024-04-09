PGDMP      %                |        	   emergency    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397 	   emergency    DATABASE     |   CREATE DATABASE emergency WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_Canada.1252';
    DROP DATABASE emergency;
                postgres    false            �            1259    16406    patientinfo    TABLE     `  CREATE TABLE public.patientinfo (
    patientid integer NOT NULL,
    userid integer,
    name character varying(100),
    dateofbirth date,
    age integer,
    gender character varying(10),
    patientcondition character varying(100),
    severity integer,
    entrytime timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    waittime integer
);
    DROP TABLE public.patientinfo;
       public         heap    postgres    false            �            1259    16405    patientinfo_patientid_seq    SEQUENCE     �   CREATE SEQUENCE public.patientinfo_patientid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.patientinfo_patientid_seq;
       public          postgres    false    218            �           0    0    patientinfo_patientid_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.patientinfo_patientid_seq OWNED BY public.patientinfo.patientid;
          public          postgres    false    217            �            1259    16399    users    TABLE     �   CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16398    users_userid_seq    SEQUENCE     �   CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.users_userid_seq;
       public          postgres    false    216            �           0    0    users_userid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;
          public          postgres    false    215            V           2604    16409    patientinfo patientid    DEFAULT     ~   ALTER TABLE ONLY public.patientinfo ALTER COLUMN patientid SET DEFAULT nextval('public.patientinfo_patientid_seq'::regclass);
 D   ALTER TABLE public.patientinfo ALTER COLUMN patientid DROP DEFAULT;
       public          postgres    false    218    217    218            U           2604    16402    users userid    DEFAULT     l   ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);
 ;   ALTER TABLE public.users ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    216    215    216            �          0    16406    patientinfo 
   TABLE DATA           �   COPY public.patientinfo (patientid, userid, name, dateofbirth, age, gender, patientcondition, severity, entrytime, waittime) FROM stdin;
    public          postgres    false    218   +       �          0    16399    users 
   TABLE DATA           ;   COPY public.users (userid, username, password) FROM stdin;
    public          postgres    false    216   %       �           0    0    patientinfo_patientid_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.patientinfo_patientid_seq', 6, true);
          public          postgres    false    217            �           0    0    users_userid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.users_userid_seq', 5, true);
          public          postgres    false    215            [           2606    16412    patientinfo patientinfo_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.patientinfo
    ADD CONSTRAINT patientinfo_pkey PRIMARY KEY (patientid);
 F   ALTER TABLE ONLY public.patientinfo DROP CONSTRAINT patientinfo_pkey;
       public            postgres    false    218            Y           2606    16404    users users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            \           2606    16413 #   patientinfo patientinfo_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.patientinfo
    ADD CONSTRAINT patientinfo_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);
 M   ALTER TABLE ONLY public.patientinfo DROP CONSTRAINT patientinfo_userid_fkey;
       public          postgres    false    216    4697    218            �   �   x�]�Aj�0�����Ō4�%�J(�.z�lL��%�Ɣ�_i�qA;����H�Wzj��;�ᐧ��*�t�Ns��?��8y�\4V�FVb��ԞB

?�[��$��ZTlEƈ��7\�k[�tB�:��_���H;�E��d�Kp�C����B��$����"Ѳ�ǯ�x��<]{��X�έ�zZo�6D*P@D}� ���;!��n�d���A��%Gk����Y�      �   L   x�3�����K�O�цF�\F��Ź��9�@����1gFIbA����!�	''�)gQ"Pqniqj����W� V�1     